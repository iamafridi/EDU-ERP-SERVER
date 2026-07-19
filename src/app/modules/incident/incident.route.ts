import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { IncidentControllers } from './incident.controller';
import { IncidentValidations } from './incident.validation';

const router = express.Router();

router.post(
    '/create-incident',
    auth('staff', 'super-admin', 'domain-admin', 'faculty', 'student'),
    validateRequest(IncidentValidations.createIncidentValidationSchema),
    IncidentControllers.createIncident,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    IncidentControllers.getAllIncidents,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    IncidentControllers.getSingleIncident,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(IncidentValidations.updateIncidentValidationSchema),
    IncidentControllers.updateIncident,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    IncidentControllers.deleteIncident,
);

export const IncidentRoutes = router;
