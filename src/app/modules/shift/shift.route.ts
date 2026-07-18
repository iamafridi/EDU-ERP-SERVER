import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ShiftControllers } from './shift.controller';
import { ShiftValidations } from './shift.validation';

const router = express.Router();

router.post(
    '/create-shift',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(ShiftValidations.createShiftValidationSchema),
    ShiftControllers.createShift,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff'),
    ShiftControllers.getAllShifts,
);
router.get(
    '/employee/:employeeId',
    auth('domain-admin', 'super-admin', 'staff'),
    ShiftControllers.getShiftsByEmployee,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    ShiftControllers.getSingleShift,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(ShiftValidations.updateShiftValidationSchema),
    ShiftControllers.updateShift,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ShiftControllers.deleteShift,

);

export const ShiftRoutes = router;
