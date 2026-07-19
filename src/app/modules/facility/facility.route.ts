import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { FacilityControllers } from './facility.controller';
import { FacilityValidations } from './facility.validation';

const router = express.Router();

router.post(
    '/create-facility',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(FacilityValidations.createFacilityValidationSchema),
    FacilityControllers.createFacility,
);
router.get(
    '/',
    auth('super-admin', 'domain-admin', 'staff'),
    FacilityControllers.getAllFacilities,
);
router.get(
    '/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    FacilityControllers.getSingleFacility,
);
router.patch(
    '/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(FacilityValidations.updateFacilityValidationSchema),
    FacilityControllers.updateFacility,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    FacilityControllers.deleteFacility,
);

export const FacilityRoutes = router;
