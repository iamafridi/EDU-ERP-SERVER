import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { OPDControllers } from './opd.controller';
import { OPDValidations } from './opd.validation';

const router = express.Router();

router.post(
    '/appointments/create',
    auth('super-admin', 'domain-admin', 'staff', 'faculty'),
    validateRequest(OPDValidations.createAppointmentValidationSchema),
    OPDControllers.createAppointment,
);
router.get(
    '/appointments',
    auth('super-admin', 'domain-admin', 'staff', 'faculty'),
    OPDControllers.getAllAppointments,
);
router.get(
    '/appointments/date/:date',
    auth('super-admin', 'domain-admin', 'staff'),
    OPDControllers.getAppointmentsByDate,
);
router.patch(
    '/appointments/:id/status',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(OPDValidations.updateAppointmentStatusValidationSchema),
    OPDControllers.updateAppointmentStatus,
);
router.delete(
    '/appointments/:id',
    auth('super-admin', 'domain-admin'),
    OPDControllers.deleteAppointment,
);

router.post(
    '/visits/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(OPDValidations.createVisitValidationSchema),
    OPDControllers.createVisit,
);
router.get(
    '/visits',
    auth('super-admin', 'domain-admin', 'staff', 'faculty'),
    OPDControllers.getAllVisits,
);
router.get(
    '/visits/patient/:patientId',
    auth('super-admin', 'domain-admin', 'staff'),
    OPDControllers.getPatientVisits,
);
router.patch(
    '/visits/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(OPDValidations.updateVisitValidationSchema),
    OPDControllers.updateVisit,
);
router.delete(
    '/visits/:id',
    auth('super-admin', 'domain-admin'),
    OPDControllers.deleteVisit,
);

export const OPDRoutes = router;
