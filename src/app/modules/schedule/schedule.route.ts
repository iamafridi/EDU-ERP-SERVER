import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ScheduleControllers } from './schedule.controller';
import { ScheduleValidations } from './schedule.validation';

const router = express.Router();

router.post(
    '/create-schedule',
    auth('domain-admin', 'super-admin'),
    validateRequest(ScheduleValidations.createScheduleValidationSchema),
    ScheduleControllers.createSchedule,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ScheduleControllers.getAllSchedules,
);

router.post(
    '/calendar-events/create-event',
    auth('domain-admin', 'super-admin'),
    validateRequest(ScheduleValidations.createCalendarEventValidationSchema),
    ScheduleControllers.createCalendarEvent,
);
router.get(
    '/calendar-events',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ScheduleControllers.getAllCalendarEvents,
);
router.patch(
    '/calendar-events/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(ScheduleValidations.updateCalendarEventValidationSchema),
    ScheduleControllers.updateCalendarEvent,
);
router.delete(
    '/calendar-events/:id',
    auth('super-admin', 'domain-admin'),
    ScheduleControllers.deleteCalendarEvent,
);

router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ScheduleControllers.getSingleSchedule,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(ScheduleValidations.updateScheduleValidationSchema),
    ScheduleControllers.updateSchedule,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ScheduleControllers.deleteSchedule,
);

export const ScheduleRoutes = router;
