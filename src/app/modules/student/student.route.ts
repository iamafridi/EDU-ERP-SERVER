import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'staff'),
  StudentControllers.getAllStudents,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin', 'faculty', 'staff', 'student'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin', 'staff'),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete(
  '/:id',
  auth('super-admin', 'domain-admin'),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
