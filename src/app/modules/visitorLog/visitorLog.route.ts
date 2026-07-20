import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { VisitorLogControllers } from './visitorLog.controller';
import { VisitorLogValidations } from './visitorLog.validation';

const router = express.Router();

router.post(
    '/create-visitor-log',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(VisitorLogValidations.createVisitorLogValidationSchema),
    VisitorLogControllers.createVisitorLog,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    VisitorLogControllers.getAllVisitorLogs,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    VisitorLogControllers.getSingleVisitorLog,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(VisitorLogValidations.updateVisitorLogValidationSchema),
    VisitorLogControllers.updateVisitorLog,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    VisitorLogControllers.deleteVisitorLog,
);

export const VisitorLogRoutes = router;
