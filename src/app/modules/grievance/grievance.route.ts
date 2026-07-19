import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { GrievanceControllers } from './grievance.controller';
import { GrievanceValidations } from './grievance.validation';

const router = express.Router();

router.post(
    '/submit',
    auth('student', 'faculty', 'staff', 'domain-admin', 'super-admin'),
    validateRequest(GrievanceValidations.createGrievanceValidationSchema),
    GrievanceControllers.createGrievance,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin'),
    GrievanceControllers.getAllGrievances,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'student', 'faculty'),
    GrievanceControllers.getSingleGrievance,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(GrievanceValidations.updateGrievanceValidationSchema),
    GrievanceControllers.updateGrievance,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    GrievanceControllers.deleteGrievance,
);

export const GrievanceRoutes = router;
