import { z } from 'zod';
import { BudgetCategories, BudgetStatuses } from './budget.constant';

const createBudgetValidationSchema = z.object({
    body: z.object({
        budgetHead: z.string({ message: 'Budget head is required' }).min(1),
        category: z.enum([...BudgetCategories] as [string, ...string[]]),
        allocatedAmount: z.number().min(0),
        spentAmount: z.number().min(0).optional(),
        fiscalYear: z.string({ message: 'Fiscal year is required' }).min(1),
        department: z.string().optional(),
        status: z.enum([...BudgetStatuses] as [string, ...string[]]).optional(),
        description: z.string().optional(),
    }),
});

const updateBudgetValidationSchema = z.object({
    body: z.object({
        budgetHead: z.string().min(1).optional(),
        category: z.enum([...BudgetCategories] as [string, ...string[]]).optional(),
        allocatedAmount: z.number().min(0).optional(),
        spentAmount: z.number().min(0).optional(),
        fiscalYear: z.string().min(1).optional(),
        department: z.string().optional(),
        status: z.enum([...BudgetStatuses] as [string, ...string[]]).optional(),
        description: z.string().optional(),
    }),
});

export const BudgetValidations = {
    createBudgetValidationSchema,
    updateBudgetValidationSchema,
};
