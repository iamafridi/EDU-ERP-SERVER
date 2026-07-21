import { Schema, model, Document } from 'mongoose';

export type TAuditLog = {
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    resource: string;
    resourceId?: string;
    userId?: string;
    userRole?: string;
    diff?: Record<string, unknown>;
    ip?: string;
    timestamp: Date;
};

export interface IAuditLog extends TAuditLog, Document {}

const auditLogSchema = new Schema<IAuditLog>(
    {
        action: {
            type: String,
            enum: ['CREATE', 'UPDATE', 'DELETE'],
            required: true,
        },
        resource: { type: String, required: true },
        resourceId: { type: String },
        userId: { type: String },
        userRole: { type: String },
        diff: { type: Schema.Types.Mixed },
        ip: { type: String },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: false },
);

auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, timestamp: -1 });
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);
