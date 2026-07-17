import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import requirePermission from '../../middlewares/requirePermission';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth('super-admin', 'domain-admin'),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth('super-admin', 'domain-admin'),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  auth('super-admin'),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get(
  '/',
  auth('super-admin', 'domain-admin'),
  UserControllers.getAllUsers,
);
router.get(
  '/:userId',
  auth('super-admin', 'domain-admin'),
  UserControllers.getSingleUser,
);

router.patch(
  '/:userId',
  auth('super-admin', 'domain-admin'),
  requirePermission('user', 'update'),
  validateRequest(userValidation.updateUserSchema),
  UserControllers.updateUser,
);

router.delete(
  '/:userId',
  auth('super-admin'),
  requirePermission('user', 'delete'),
  validateRequest(userValidation.userIdParamSchema),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
