import express from 'express';
import auth from '../../middlewares/auth';
import { DashboardControllers } from './dashboard.controller';

const router = express.Router();

router.get(
    '/',
    auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
    DashboardControllers.getDashboard,
);

export const DashboardRoutes = router;
