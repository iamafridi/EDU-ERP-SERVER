import { z } from 'zod';
import { HandoverShift } from './handover.constant';

const createHandoverValidationSchema = z.object({
    body: z.object({
        toGuard: z.string({ message: 'Recipient guard ID is required' }),
        shift: z.enum([...HandoverShift] as [string, ...string[]]),
        notes: z.string({ message: 'Notes must be a string' }).min(1),
        pendingTasks: z.array(z.string()).optional(),
        handoverTime: z.string().datetime(),
    }),
});

const updateHandoverValidationSchema = z.object({
    body: z.object({
        acknowledged: z.boolean().optional(),
        notes: z.string({ message: 'Notes must be a string' }).optional(),
        pendingTasks: z.array(z.string()).optional(),
    }),
});

export const HandoverValidations = {
    createHandoverValidationSchema,
    updateHandoverValidationSchema,
};
