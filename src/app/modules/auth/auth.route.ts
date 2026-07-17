import express from 'express';
import rateLimit from 'express-rate-limit';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/login',
  loginLimiter,
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/logout',
  auth(),
  AuthControllers.logout,
);

router.patch(
  '/profile',
  auth(),
  validateRequest(AuthValidations.updateProfileValidationSchema),
  AuthControllers.updateProfile,
);

router.get(
  '/me',
  auth(),
  AuthControllers.getMe,
);

router.post(
  '/sync-password',
  auth('super-admin', 'domain-admin'),
  validateRequest(AuthValidations.syncPasswordValidationSchema),
  AuthControllers.syncPassword,
);

export const AuthRoutes = router;
