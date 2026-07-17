import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AdmissionControllers } from './admission.controller';
import { AdmissionValidations } from './admission.validation';

const router = express.Router();

router.post(
    '/apply',
    auth('student', 'staff'),
    validateRequest(AdmissionValidations.createApplicationValidationSchema),
    AdmissionControllers.createApplication,
);
router.get(
    '/applications',
    auth('super-admin', 'domain-admin'),
    AdmissionControllers.getAllApplications,
);
router.get(
    '/applications/:id',
    auth('super-admin', 'domain-admin', 'student'),
    AdmissionControllers.getSingleApplication,
);
router.patch(
    '/applications/:id/status',
    auth('super-admin', 'domain-admin'),
    validateRequest(AdmissionValidations.updateApplicationStatusValidationSchema),
    AdmissionControllers.updateApplicationStatus,
);
router.delete(
    '/applications/:id',
    auth('super-admin', 'domain-admin'),
    AdmissionControllers.deleteApplication,
);

router.post(
    '/merit-list',
    auth('super-admin', 'domain-admin'),
    validateRequest(AdmissionValidations.createMeritListValidationSchema),
    AdmissionControllers.createMeritList,
);
router.get(
    '/merit-list',
    auth('super-admin', 'domain-admin', 'student', 'staff'),
    AdmissionControllers.getAllMeritLists,
);
router.delete(
    '/merit-list/:id',
    auth('super-admin', 'domain-admin'),
    AdmissionControllers.deleteMeritList,
);

export const AdmissionRoutes = router;
