import { z } from 'zod';
import { ResearchTypes, ResearchStatuses } from './research.constant';

const createResearchValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }).min(1),
        authors: z.array(z.string()).optional(),
        type: z.enum([...ResearchTypes] as [string, ...string[]]),
        abstract: z.string().optional(),
        journal: z.string().optional(),
        doi: z.string().optional(),
        grantAmount: z.number().min(0).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
    }),
});

const updateResearchValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        authors: z.array(z.string()).optional(),
        type: z.enum([...ResearchTypes] as [string, ...string[]]).optional(),
        status: z.enum([...ResearchStatuses] as [string, ...string[]]).optional(),
        abstract: z.string().optional(),
        journal: z.string().optional(),
        doi: z.string().optional(),
        grantAmount: z.number().min(0).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
    }),
});

export const ResearchValidations = {
    createResearchValidationSchema,
    updateResearchValidationSchema,
};
