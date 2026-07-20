import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ReportControllers } from './report.controller';
import { ReportValidations } from './report.validation';

const router = express.Router();

router.post(
    '/generate',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(ReportValidations.createReportValidationSchema),
    ReportControllers.createReport,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff'),
    ReportControllers.getAllReports,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    ReportControllers.getSingleReport,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ReportControllers.deleteReport,
);

export const ReportRoutes = router;
