import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ClinicalRotationControllers } from './clinicalRotation.controller';
import { ClinicalRotationValidations } from './clinicalRotation.validation';

const router = express.Router();

router.post(
    '/create-clinical-rotation',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(ClinicalRotationValidations.createClinicalRotationValidationSchema),
    ClinicalRotationControllers.createClinicalRotation,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ClinicalRotationControllers.getAllClinicalRotations,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ClinicalRotationControllers.getSingleClinicalRotation,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(ClinicalRotationValidations.updateClinicalRotationValidationSchema),
    ClinicalRotationControllers.updateClinicalRotation,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ClinicalRotationControllers.deleteClinicalRotation,
);

export const ClinicalRotationRoutes = router;
