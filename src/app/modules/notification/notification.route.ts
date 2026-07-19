import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { NotificationControllers } from './notification.controller';
import { NotificationValidations } from './notification.validation';

const router = express.Router();

router.post(
    '/send',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(NotificationValidations.createNotificationValidationSchema),
    NotificationControllers.createNotification,
);
router.get(
    '/',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.getAllNotifications,
);
router.get(
    '/activity-feed',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.getActivityFeed,
);
router.get(
    '/unread-count',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.getUnreadCount,
);
router.patch(
    '/:id/read',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.markAsRead,
);
router.patch(
    '/mark-all-read',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.markAllAsRead,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    NotificationControllers.deleteNotification,
);

export const NotificationRoutes = router;
