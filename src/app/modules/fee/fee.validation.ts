import { z } from 'zod';

const feeHeadEntrySchema = z.object({
    head: z.string({ message: 'Fee head ID is required' }),
    amount: z.number().min(0),
});

const createFeeValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        totalAmount: z.number().min(0),
        dueAmount: z.number().min(0),
        lateFee: z.number().optional(),
        dueDate: z.string().datetime(),
        feeHeads: z.array(feeHeadEntrySchema).optional(),
    }),
});

const updateFeeValidationSchema = z.object({
    body: z.object({
        paidAmount: z.number().min(0).optional(),
        lateFee: z.number().optional(),
        status: z.enum(['unpaid', 'partial', 'paid']).optional(),
    }),
});

const bulkGenerateFeeValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        dueDate: z.string().datetime(),
    }),
});

export const FeeValidations = {
    createFeeValidationSchema,
    updateFeeValidationSchema,
    bulkGenerateFeeValidationSchema,
};
