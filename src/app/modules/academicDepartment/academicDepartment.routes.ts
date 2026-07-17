import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicDepartmentControllers.getAllAcademicDepartments,
);
router.get(
  '/:departmentId',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicDepartmentControllers.getASingleAcademicDepartment,
);
router.post(
  '/create-academic-department',
  auth('super-admin', 'domain-admin'),
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.patch(
  '/:departmentId',
  auth('super-admin', 'domain-admin'),
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.delete(
  '/:departmentId',
  auth('super-admin', 'domain-admin'),
  AcademicDepartmentControllers.deleteAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
