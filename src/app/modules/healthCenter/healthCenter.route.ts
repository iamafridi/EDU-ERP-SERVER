import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { HealthCenterControllers } from './healthCenter.controller';
import { HealthCenterValidations } from './healthCenter.validation';

const router = express.Router();

router.post(
    '/create-visit',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(HealthCenterValidations.createHealthCenterValidationSchema),
    HealthCenterControllers.createHealthCenter,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    HealthCenterControllers.getAllHealthCenters,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    HealthCenterControllers.getSingleHealthCenter,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(HealthCenterValidations.updateHealthCenterValidationSchema),
    HealthCenterControllers.updateHealthCenter,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    HealthCenterControllers.deleteHealthCenter,
);

export const HealthCenterRoutes = router;
