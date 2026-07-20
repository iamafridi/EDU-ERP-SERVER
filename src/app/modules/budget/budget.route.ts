import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { BudgetControllers } from './budget.controller';
import { BudgetValidations } from './budget.validation';

const router = express.Router();

router.post(
    '/create-budget',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(BudgetValidations.createBudgetValidationSchema),
    BudgetControllers.createBudget,
);
router.get(
    '/summary',
    auth('staff', 'domain-admin', 'super-admin'),
    BudgetControllers.getBudgetSummary,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin'),
    BudgetControllers.getAllBudgets,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    BudgetControllers.getSingleBudget,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(BudgetValidations.updateBudgetValidationSchema),
    BudgetControllers.updateBudget,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    BudgetControllers.deleteBudget,
);

export const BudgetRoutes = router;
