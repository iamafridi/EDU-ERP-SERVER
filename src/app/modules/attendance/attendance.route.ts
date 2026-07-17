import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AttendanceControllers } from './attendance.controller';
import { AttendanceValidations } from './attendance.validation';

const router = express.Router();

router.post(
    '/mark-attendance',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(AttendanceValidations.createAttendanceValidationSchema),
    AttendanceControllers.createAttendance,
);
router.post(
    '/bulk-attendance',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(AttendanceValidations.bulkAttendanceValidationSchema),
    AttendanceControllers.bulkCreateAttendance,
);
router.post(
    '/bulk-date-range',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(AttendanceValidations.bulkDateRangeAttendanceValidationSchema),
    AttendanceControllers.bulkDateRangeCreateAttendance,
);
router.get(
    '/',
    auth('faculty', 'super-admin', 'domain-admin', 'student'),
    AttendanceControllers.getAllAttendance,
);
router.get(
    '/report',
    auth('faculty', 'super-admin', 'domain-admin', 'student', 'staff'),
    AttendanceControllers.getAttendanceReport,
);
router.patch(
    '/:id',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(AttendanceValidations.updateAttendanceValidationSchema),
    AttendanceControllers.updateAttendance,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    AttendanceControllers.deleteAttendance,
);

export const AttendanceRoutes = router;
