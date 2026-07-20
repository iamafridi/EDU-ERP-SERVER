import { z } from 'zod';

const allowancesSchema = z.object({
    hra: z.number().optional(),
    da: z.number().optional(),
    travel: z.number().optional(),
    medical: z.number().optional(),
    special: z.number().optional(),
});

const deductionsSchema = z.object({
    tax: z.number().optional(),
    providentFund: z.number().optional(),
    insurance: z.number().optional(),
    loan: z.number().optional(),
    other: z.number().optional(),
});

const createPayrollValidationSchema = z.object({
    body: z.object({
        employee: z.string({ message: 'Employee ID is required' }),
        month: z.number().min(1).max(12),
        year: z.number(),
        basicSalary: z.number().min(0),
        allowances: allowancesSchema.optional(),
        deductions: deductionsSchema.optional(),
        grossPay: z.number().min(0),
        totalDeductions: z.number().min(0),
        netPay: z.number().min(0),
        paymentDate: z.string().datetime().optional(),
    }),
});

const updatePayrollValidationSchema = z.object({
    body: z.object({
        basicSalary: z.number().min(0).optional(),
        allowances: allowancesSchema.optional(),
        deductions: deductionsSchema.optional(),
        grossPay: z.number().min(0).optional(),
        totalDeductions: z.number().min(0).optional(),
        netPay: z.number().min(0).optional(),
        paymentDate: z.string().datetime().optional(),
    }),
});

export const PayrollValidations = {
    createPayrollValidationSchema,
    updatePayrollValidationSchema,
};
