import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { IPDControllers } from './ipd.controller';
import { IPDValidations } from './ipd.validation';

const router = express.Router();

router.post(
    '/admissions/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(IPDValidations.createAdmissionValidationSchema),
    IPDControllers.createAdmission,
);
router.get(
    '/admissions',
    auth('super-admin', 'domain-admin', 'staff', 'faculty'),
    IPDControllers.getAllAdmissions,
);
router.get(
    '/admissions/current',
    auth('super-admin', 'domain-admin', 'staff'),
    IPDControllers.getCurrentAdmissions,
);
router.get(
    '/admissions/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    IPDControllers.getSingleAdmission,
);
router.patch(
    '/admissions/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(IPDValidations.updateAdmissionValidationSchema),
    IPDControllers.updateAdmission,
);

router.post(
    '/admissions/:admissionId/discharge',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(IPDValidations.dischargePatientValidationSchema),
    IPDControllers.dischargePatient,
);
router.get(
    '/discharges',
    auth('super-admin', 'domain-admin', 'staff'),
    IPDControllers.getDischarges,
);
router.get(
    '/admissions/patient/:patientId',
    auth('super-admin', 'domain-admin', 'staff'),
    IPDControllers.getAdmissionByPatient,
);

export const IPDRoutes = router;
