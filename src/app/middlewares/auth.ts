import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { JwtHelpers } from '../utils/jwt';
import redis from '../utils/redis';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    const decoded = JwtHelpers.verifyToken(token) as { uid: string; email: string; role: TUserRole; domainAdminType?: string; staffSubRole?: string; userId: string; profileId: string; profileType: string; jti?: string };

    if (decoded.jti) {
      const isBlacklisted = await redis.get(`bl:${decoded.jti}`).catch(() => null);
      if (isBlacklisted) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Token has been revoked');
      }
    }

    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not found. Please register first.');
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This account has been deleted');
    }
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This account has been blocked');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

    req.user = {
      uid: user.firebaseUid,
      email: user.email,
      role: user.role,
      domainAdminType: user.domainAdminType,
      staffSubRole: user.staffSubRole,
      userId: user._id.toString(),
      profileId: user.profileRef?.toString() || '',
      profileType: user.profileType || '',
      isDemo: user.isDemo || false,
    };

    if (user.isDemo && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Demo accounts are view-only. You cannot create, edit, or delete data.',
      );
    }

    next();
  });
};

export default auth;
