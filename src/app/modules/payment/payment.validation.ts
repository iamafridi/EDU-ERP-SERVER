import { z } from 'zod';
import { PaymentMethods } from './payment.constant';

const createPaymentValidationSchema = z.object({
    body: z.object({
        fee: z.string({ message: 'Fee ID is required' }),
        student: z.string({ message: 'Student ID is required' }),
        amount: z.number().min(1),
        method: z.enum([...PaymentMethods] as [string, ...string[]]),
        transactionId: z.string().optional(),
        paymentDate: z.string().datetime(),
    }),
});

export const PaymentValidations = {
    createPaymentValidationSchema,
};
