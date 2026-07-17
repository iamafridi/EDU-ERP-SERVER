import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { User } from '../user/user.model';
import config from '../../config';

const getMe = catchAsync(async (req, res) => {
  const result = await AuthServices.getMeFromDB(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await AuthServices.updateProfileInDB(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const jwt = require('jsonwebtoken');
      const config = require('../../config').default;
      const decoded = jwt.verify(token, config.jwt_secret) as { jti?: string; exp?: number };
      if (decoded.jti && decoded.exp) {
        const redis = require('../../utils/redis').default;
        const remainingTtl = decoded.exp - Math.floor(Date.now() / 1000);
        if (remainingTtl > 0) {
          await redis.setex(`bl:${decoded.jti}`, remainingTtl, '1');
        }
      }
    } catch {
      // Token already invalid — nothing to blacklist
    }
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

const syncPassword = catchAsync(async (req, res) => {
  const admin = require('firebase-admin');
  const { email, newPassword } = req.body;
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !email || !newPassword) {
    throw new (require('../../errors/AppError').default)(httpStatus.BAD_REQUEST, 'Missing required fields');
  }
  const firebaseUser = await admin.auth().verifyIdToken(token);
  if (firebaseUser.email !== email) {
    throw new (require('../../errors/AppError').default)(httpStatus.FORBIDDEN, 'Email mismatch');
  }
  const hashed = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
  await User.findOneAndUpdate({ email }, { password: hashed });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password synced successfully',
    data: null,
  });
});

export const AuthControllers = {
  getMe,
  loginUser,
  updateProfile,
  logout,
  syncPassword,
};
