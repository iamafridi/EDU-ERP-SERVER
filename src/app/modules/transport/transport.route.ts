import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { TransportControllers } from './transport.controller';
import { TransportValidations } from './transport.validation';

const router = express.Router();

// Vehicle routes
router.post(
    '/create-vehicle',
    auth('super-admin', 'domain-admin'),
    validateRequest(TransportValidations.createVehicleValidationSchema),
    TransportControllers.createVehicle,
);
router.get(
    '/vehicles',
    auth('super-admin', 'domain-admin', 'student', 'faculty'),
    TransportControllers.getAllVehicles,
);
router.get(
    '/vehicles/:id',
    auth('super-admin', 'domain-admin', 'student', 'faculty'),
    TransportControllers.getSingleVehicle,
);
router.patch(
    '/vehicles/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(TransportValidations.updateVehicleValidationSchema),
    TransportControllers.updateVehicle,
);
router.delete(
    '/vehicles/:id',
    auth('super-admin', 'domain-admin'),
    TransportControllers.deleteVehicle,
);

// Route routes
router.post(
    '/create-route',
    auth('super-admin', 'domain-admin'),
    validateRequest(TransportValidations.createRouteValidationSchema),
    TransportControllers.createRoute,
);
router.get(
    '/routes',
    auth('super-admin', 'domain-admin', 'student', 'faculty'),
    TransportControllers.getAllRoutes,
);
router.get(
    '/routes/:id',
    auth('super-admin', 'domain-admin', 'student', 'faculty'),
    TransportControllers.getSingleRoute,
);
router.patch(
    '/routes/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(TransportValidations.updateRouteValidationSchema),
    TransportControllers.updateRoute,
);
router.delete(
    '/routes/:id',
    auth('super-admin', 'domain-admin'),
    TransportControllers.deleteRoute,
);

// Fee routes
router.post(
    '/create-fee',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(TransportValidations.createFeeValidationSchema),
    TransportControllers.createFee,
);
router.get(
    '/fees',
    auth('super-admin', 'domain-admin', 'staff', 'student'),
    TransportControllers.getAllFees,
);
router.patch(
    '/fees/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(TransportValidations.updateFeeValidationSchema),
    TransportControllers.updateFee,
);
router.delete(
    '/fees/:id',
    auth('super-admin', 'domain-admin'),
    TransportControllers.deleteFee,
);

export const TransportRoutes = router;
