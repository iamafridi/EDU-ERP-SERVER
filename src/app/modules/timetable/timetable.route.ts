import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { TimetableControllers } from './timetable.controller';
import { TimetableValidations } from './timetable.validation';

const router = express.Router();

router.post(
    '/create',
    auth('super-admin', 'domain-admin'),
    validateRequest(TimetableValidations.createTimetableValidationSchema),
    TimetableControllers.createTimetable,
);
router.get(
    '/',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    TimetableControllers.getAllTimetables,
);
router.get(
    '/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    TimetableControllers.getSingleTimetable,
);
router.patch(
    '/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(TimetableValidations.updateTimetableValidationSchema),
    TimetableControllers.updateTimetable,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    TimetableControllers.deleteTimetable,
);

router.post(
    '/:id/entries',
    auth('super-admin', 'domain-admin'),
    validateRequest(TimetableValidations.addEntryValidationSchema),
    TimetableControllers.addEntry,
);
router.delete(
    '/:id/entries/:entryId',
    auth('super-admin', 'domain-admin'),
    TimetableControllers.removeEntry,
);
router.get(
    '/:id/grid',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    TimetableControllers.getGrid,
);

export const TimetableRoutes = router;
