import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty'),
  FacultyControllers.getAllFaculties,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin', 'faculty'),
  FacultyControllers.getSingleFaculty,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete(
  '/:id',
  auth('super-admin', 'domain-admin'),
  FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;
