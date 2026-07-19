import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { NoticeControllers } from './notice.controller';
import { NoticeValidations } from './notice.validation';

const router = express.Router();

router.post(
    '/create-notice',
    auth('domain-admin', 'super-admin'),
    validateRequest(NoticeValidations.createNoticeValidationSchema),
    NoticeControllers.createNotice,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    NoticeControllers.getAllNotices,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    NoticeControllers.getSingleNotice,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(NoticeValidations.updateNoticeValidationSchema),
    NoticeControllers.updateNotice,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    NoticeControllers.deleteNotice,
);

export const NoticeRoutes = router;
