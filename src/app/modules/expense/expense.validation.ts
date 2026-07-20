import { z } from 'zod';
import { ExpenseCategories, ExpensePaymentMethods } from './expense.constant';

const createExpenseValidationSchema = z.object({
    body: z.object({
        vendor: z.string().optional(),
        category: z.enum([...ExpenseCategories] as [string, ...string[]]),
        amount: z.number().min(0),
        description: z.string({ message: 'Description is required' }).min(1),
        paymentDate: z.string().datetime(),
        paymentMethod: z.enum([...ExpensePaymentMethods] as [string, ...string[]]),
        paidTo: z.string().optional(),
        receiptAttached: z.boolean().optional(),
        budgetHead: z.string().optional(),
    }),
});

const updateExpenseValidationSchema = z.object({
    body: z.object({
        vendor: z.string().optional(),
        category: z.enum([...ExpenseCategories] as [string, ...string[]]).optional(),
        amount: z.number().min(0).optional(),
        description: z.string().min(1).optional(),
        paymentDate: z.string().datetime().optional(),
        paymentMethod: z.enum([...ExpensePaymentMethods] as [string, ...string[]]).optional(),
        paidTo: z.string().optional(),
        receiptAttached: z.boolean().optional(),
        budgetHead: z.string().optional(),
    }),
});

export const ExpenseValidations = {
    createExpenseValidationSchema,
    updateExpenseValidationSchema,
};
