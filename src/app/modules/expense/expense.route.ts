import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ExpenseControllers } from './expense.controller';
import { ExpenseValidations } from './expense.validation';

const router = express.Router();

router.post(
    '/create-expense',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(ExpenseValidations.createExpenseValidationSchema),
    ExpenseControllers.createExpense,
);
router.get(
    '/summary',
    auth('staff', 'domain-admin', 'super-admin'),
    ExpenseControllers.getExpenseSummary,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin'),
    ExpenseControllers.getAllExpenses,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    ExpenseControllers.getSingleExpense,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(ExpenseValidations.updateExpenseValidationSchema),
    ExpenseControllers.updateExpense,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ExpenseControllers.deleteExpense,
);

export const ExpenseRoutes = router;
