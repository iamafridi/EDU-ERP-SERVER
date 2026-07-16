import { Request, Response, NextFunction } from 'express';
import { AuditLog } from '../modules/auditLog/auditLog.model';

const audit = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = function (body: unknown) {
        const method = req.method;
        let action: 'CREATE' | 'UPDATE' | 'DELETE' | null = null;

        if (method === 'POST') action = 'CREATE';
        else if (method === 'PATCH' || method === 'PUT') action = 'UPDATE';
        else if (method === 'DELETE') action = 'DELETE';

        if (action && res.statusCode < 400) {
            const diff: Record<string, unknown> = {};

            if (action === 'CREATE') {
                diff.created = true;
            } else if (action === 'UPDATE') {
                const changes = { ...req.body };
                delete changes.password;
                delete changes.confirmPassword;
                if (Object.keys(changes).length > 0) {
                    diff.changes = changes;
                }
            } else if (action === 'DELETE') {
                diff.deleted = true;
            }

            AuditLog.create({
                action,
                resource: req.originalUrl,
                resourceId: req.params?.id,
                userId: (req as any).user?.userId,
                userRole: (req as any).user?.role,
                diff: Object.keys(diff).length > 0 ? diff : undefined,
                ip: req.ip,
                timestamp: new Date(),
            }).catch((err) => {
                console.error('Audit log write failed:', err);
            });
        }

        return originalJson(body);
    };

    next();
};

export default audit;
