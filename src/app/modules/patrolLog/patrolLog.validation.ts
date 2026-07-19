import { z } from 'zod';
import { PatrolStatus } from './patrolLog.constant';

const createPatrolLogValidationSchema = z.object({
    body: z.object({
        checkpoint: z.string({ message: 'Checkpoint must be a string' }).min(1),
        scanTime: z.string().datetime(),
        status: z.enum([...PatrolStatus] as [string, ...string[]]),
        notes: z.string({ message: 'Notes must be a string' }).optional(),
    }),
});

const updatePatrolLogValidationSchema = z.object({
    body: z.object({
        checkpoint: z.string({ message: 'Checkpoint must be a string' }).optional(),
        scanTime: z.string().datetime().optional(),
        status: z.enum([...PatrolStatus] as [string, ...string[]]).optional(),
        notes: z.string({ message: 'Notes must be a string' }).optional(),
    }),
});

export const PatrolLogValidations = {
    createPatrolLogValidationSchema,
    updatePatrolLogValidationSchema,
};
