import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicFacultyControllers.getAllAcademicFaculties,
);
router.get(
  '/:facultyId',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  AcademicFacultyControllers.getASingleAcademicFaculty,
);
router.post(
  '/create-academic-faculty',
  auth('super-admin', 'domain-admin'),
  validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:facultyId',
  auth('super-admin', 'domain-admin'),
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.delete(
  '/:facultyId',
  auth('super-admin', 'domain-admin'),
  AcademicFacultyControllers.deleteAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
