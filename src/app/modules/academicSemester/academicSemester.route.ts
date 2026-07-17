import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { academicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get(
  '/:code',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicSemesterControllers.getASingleAcademicSemester,
);
router.post(
  '/create-academic-semester',
  auth('super-admin', 'domain-admin'),
  validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.patch(
  '/:semesterId',
  auth('super-admin', 'domain-admin'),
  validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);
router.delete(
  '/:semesterId',
  auth('super-admin', 'domain-admin'),
  AcademicSemesterControllers.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = router;
