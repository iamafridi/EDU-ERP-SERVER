import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LaboratoryControllers } from './laboratory.controller';
import { LaboratoryValidations } from './laboratory.validation';

const router = express.Router();

router.post(
    '/tests/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.createLabTestValidationSchema),
    LaboratoryControllers.createLabTest,
);
router.get(
    '/tests',
    auth('super-admin', 'domain-admin', 'staff'),
    LaboratoryControllers.getAllLabTests,
);
router.get(
    '/tests/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    LaboratoryControllers.getSingleLabTest,
);
router.patch(
    '/tests/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.updateLabTestValidationSchema),
    LaboratoryControllers.updateLabTest,
);
router.delete(
    '/tests/:id',
    auth('super-admin', 'domain-admin'),
    LaboratoryControllers.deleteLabTest,
);

router.post(
    '/requests/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.createLabRequestValidationSchema),
    LaboratoryControllers.createLabRequest,
);
router.get(
    '/requests',
    auth('super-admin', 'domain-admin', 'staff'),
    LaboratoryControllers.getAllLabRequests,
);
router.patch(
    '/requests/:id/status',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.updateLabRequestStatusValidationSchema),
    LaboratoryControllers.updateLabRequestStatus,
);

router.post(
    '/results/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.createLabResultValidationSchema),
    LaboratoryControllers.createLabResult,
);
router.get(
    '/results/request/:requestId',
    auth('super-admin', 'domain-admin', 'staff'),
    LaboratoryControllers.getResultsByRequest,
);
router.patch(
    '/results/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(LaboratoryValidations.createLabResultValidationSchema),
    LaboratoryControllers.updateLabResult,
);

export const LaboratoryRoutes = router;
