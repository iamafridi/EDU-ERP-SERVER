import { z } from 'zod';
import { AccreditationBodies, AccreditationTypes } from './accreditation.constant';

const createAccreditationValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Name is required' }).min(1),
        body: z.enum([...AccreditationBodies] as [string, ...string[]]),
        type: z.enum([...AccreditationTypes] as [string, ...string[]]),
        dueDate: z.string().datetime(),
        data: z.record(z.string(), z.any()).optional(),
        attachments: z.array(z.string()).optional(),
    }),
});

const updateAccreditationValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        status: z.enum(['draft', 'submitted', 'approved', 'rejected']).optional(),
        submittedDate: z.string().datetime().optional(),
        data: z.record(z.string(), z.any()).optional(),
        attachments: z.array(z.string()).optional(),
    }),
});

export const AccreditationValidations = {
    createAccreditationValidationSchema,
    updateAccreditationValidationSchema,
};
