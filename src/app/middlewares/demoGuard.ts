import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse';

const demoGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isDemo && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Demo accounts are view-only. You cannot create, edit, or delete data.',
      data: null,
    });
  }
  next();
};

export default demoGuard;
