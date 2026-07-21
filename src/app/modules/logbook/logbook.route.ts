import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LogbookControllers } from './logbook.controller';
import { LogbookValidations } from './logbook.validation';

const router = express.Router();

router.post(
    '/procedures/create',
    auth('super-admin', 'domain-admin'),
    validateRequest(LogbookValidations.createClinicalProcedureValidationSchema),
    LogbookControllers.createClinicalProcedure,
);
router.get(
    '/procedures',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    LogbookControllers.getAllClinicalProcedures,
);
router.get(
    '/procedures/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    LogbookControllers.getSingleClinicalProcedure,
);
router.patch(
    '/procedures/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(LogbookValidations.updateClinicalProcedureValidationSchema),
    LogbookControllers.updateClinicalProcedure,
);
router.delete(
    '/procedures/:id',
    auth('super-admin', 'domain-admin'),
    LogbookControllers.deleteClinicalProcedure,
);

router.post(
    '/entries/create',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    validateRequest(LogbookValidations.createLogEntryValidationSchema),
    LogbookControllers.createLogEntry,
);
router.get(
    '/entries',
    auth('super-admin', 'domain-admin', 'faculty', 'staff'),
    LogbookControllers.getAllLogEntries,
);
router.get(
    '/entries/student/:studentId',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    LogbookControllers.getStudentLogEntries,
);
router.patch(
    '/entries/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'staff'),
    validateRequest(LogbookValidations.updateLogEntryValidationSchema),
    LogbookControllers.updateLogEntry,
);
router.delete(
    '/entries/:id',
    auth('super-admin', 'domain-admin'),
    LogbookControllers.deleteLogEntry,
);
router.patch(
    '/entries/:id/sign-off',
    auth('super-admin', 'domain-admin', 'faculty', 'staff'),
    LogbookControllers.signOffLogEntry,
);

router.get(
    '/summary/:studentId',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    LogbookControllers.getStudentSummary,
);

export const LogbookRoutes = router;
