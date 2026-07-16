import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { canAccess, TPermission } from '../../shared/permissions';
import catchAsync from '../utils/catchAsync';

const requirePermission = (module: string, permission: TPermission) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Authentication required');
    }

    const hasAccess = canAccess(
      req.user.role,
      req.user.domainAdminType,
      req.user.staffSubRole,
      module,
      permission,
    );

    if (!hasAccess) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Access denied. Insufficient permissions for ${module}:${permission}.`,
      );
    }

    next();
  });
};

export default requirePermission;
