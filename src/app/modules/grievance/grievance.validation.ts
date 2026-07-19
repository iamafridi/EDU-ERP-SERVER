import { z } from 'zod';
import { GrievanceCategories } from './grievance.constant';

const createGrievanceValidationSchema = z.object({
    body: z.object({
        isAnonymous: z.boolean().optional(),
        subject: z.string({ message: 'Subject is required' }).min(1),
        description: z.string({ message: 'Description is required' }).min(1),
        category: z.enum([...GrievanceCategories] as [string, ...string[]]),
    }),
});

const updateGrievanceValidationSchema = z.object({
    body: z.object({
        status: z.enum(['submitted', 'under-review', 'resolved', 'closed']).optional(),
        assignedTo: z.string().optional(),
        resolution: z.string().optional(),
    }),
});

export const GrievanceValidations = {
    createGrievanceValidationSchema,
    updateGrievanceValidationSchema,
};
