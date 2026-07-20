import { z } from 'zod';

const createReceiptValidationSchema = z.object({
    body: z.object({
        payment: z.string({ message: 'Payment ID is required' }),
        fee: z.string({ message: 'Fee ID is required' }),
        student: z.string({ message: 'Student ID is required' }),
        amount: z.number().min(1),
    }),
});

export const ReceiptValidations = {
    createReceiptValidationSchema,
};
