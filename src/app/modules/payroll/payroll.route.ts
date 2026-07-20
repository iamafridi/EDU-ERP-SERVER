import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PayrollControllers } from './payroll.controller';
import { PayrollValidations } from './payroll.validation';

const router = express.Router();

router.post(
    '/create-payroll',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(PayrollValidations.createPayrollValidationSchema),
    PayrollControllers.createPayroll,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin'),
    PayrollControllers.getAllPayrolls,
);
router.get(
    '/:id/slip',
    auth('staff', 'domain-admin', 'super-admin'),
    PayrollControllers.getSalarySlip,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    PayrollControllers.getSinglePayroll,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(PayrollValidations.updatePayrollValidationSchema),
    PayrollControllers.updatePayroll,
);
router.patch(
    '/:id/mark-paid',
    auth('staff', 'domain-admin', 'super-admin'),
    PayrollControllers.markPayrollPaid,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    PayrollControllers.deletePayroll,
);

export const PayrollRoutes = router;
