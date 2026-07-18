import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { MaintenanceControllers } from './maintenance.controller';
import { MaintenanceValidations } from './maintenance.validation';

const router = express.Router();

router.post(
    '/create-profile',
    auth('super-admin', 'domain-admin'),
    MaintenanceControllers.createMaintenanceProfile,
);
router.get(
    '/profile/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    MaintenanceControllers.getMaintenanceProfile,
);
router.patch(
    '/profile/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    MaintenanceControllers.updateMaintenanceProfile,
);

router.post(
    '/complaints',
    auth('super-admin', 'domain-admin', 'staff', 'faculty', 'student'),
    validateRequest(MaintenanceValidations.createComplaintValidationSchema),
    MaintenanceControllers.createComplaint,
);
router.get(
    '/complaints',
    auth('super-admin', 'domain-admin', 'staff'),
    MaintenanceControllers.getAllComplaints,
);
router.get(
    '/complaints/:id',
    auth('super-admin', 'domain-admin', 'staff', 'faculty', 'student'),
    MaintenanceControllers.getSingleComplaint,
);
router.patch(
    '/complaints/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(MaintenanceValidations.updateComplaintStatusValidationSchema),
    MaintenanceControllers.updateComplaintStatus,
);
router.delete(
    '/complaints/:id',
    auth('super-admin', 'domain-admin'),
    MaintenanceControllers.deleteComplaint,
);

export const MaintenanceRoutes = router;
