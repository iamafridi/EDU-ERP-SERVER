import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LaundryControllers } from './laundry.controller';
import { LaundryValidations } from './laundry.validation';

const router = express.Router();

router.post(
    '/create-laundry-request',
    auth('student', 'super-admin', 'domain-admin'),
    validateRequest(LaundryValidations.createLaundryValidationSchema),
    LaundryControllers.createLaundryRequest,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    LaundryControllers.getAllLaundryRequests,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    LaundryControllers.getSingleLaundryRequest,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(LaundryValidations.updateLaundryValidationSchema),
    LaundryControllers.updateLaundryRequest,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    LaundryControllers.deleteLaundryRequest,
);

export const LaundryRoutes = router;
