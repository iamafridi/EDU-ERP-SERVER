import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LeaveControllers } from './leave.controller';
import { LeaveValidations } from './leave.validation';

const router = express.Router();

router.post(
    '/apply',
    auth('faculty', 'domain-admin', 'staff', 'student'),
    validateRequest(LeaveValidations.createLeaveValidationSchema),
    LeaveControllers.createLeave,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff'),
    LeaveControllers.getAllLeaves,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'staff'),
    LeaveControllers.getSingleLeave,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(LeaveValidations.updateLeaveValidationSchema),
    LeaveControllers.updateLeave,
);
router.patch(
    '/:id/approve',
    auth('domain-admin', 'super-admin'),
    LeaveControllers.approveLeave,
);
router.patch(
    '/:id/reject',
    auth('domain-admin', 'super-admin'),
    LeaveControllers.rejectLeave,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    LeaveControllers.deleteLeave,
);

export const LeaveRoutes = router;
