import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin'),
  AdminControllers.getAllAdmins,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin'),
  AdminControllers.getSingleAdmin,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin'),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete(
  '/:adminId',
  auth('super-admin'),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
