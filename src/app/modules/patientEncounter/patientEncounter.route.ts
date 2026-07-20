import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PatientEncounterControllers } from './patientEncounter.controller';
import { PatientEncounterValidations } from './patientEncounter.validation';

const router = express.Router();

router.post(
    '/create-encounter',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    validateRequest(PatientEncounterValidations.createPatientEncounterValidationSchema),
    PatientEncounterControllers.createPatientEncounter,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    PatientEncounterControllers.getAllPatientEncounters,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    PatientEncounterControllers.getSinglePatientEncounter,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(PatientEncounterValidations.updatePatientEncounterValidationSchema),
    PatientEncounterControllers.updatePatientEncounter,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    PatientEncounterControllers.deletePatientEncounter,
);

export const PatientEncounterRoutes = router;
