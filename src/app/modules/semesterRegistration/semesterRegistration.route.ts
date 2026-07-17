import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth('super-admin', 'domain-admin'),
  validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  SemesterRegistrationController.getAllSemesterRegistrations,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin'),
  validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
