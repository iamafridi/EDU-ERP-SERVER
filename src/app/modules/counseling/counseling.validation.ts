import { z } from 'zod';
import { CounselingTypes, CounselingModes } from './counseling.constant';

const createCounselingValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        counselor: z.string({ message: 'Counselor ID is required' }),
        sessionDate: z.string().datetime(),
        type: z.enum([...CounselingTypes] as [string, ...string[]]),
        mode: z.enum([...CounselingModes] as [string, ...string[]]),
        privateNotes: z.string().optional(),
        checkIn: z.string().optional(),
    }),
});

const updateCounselingValidationSchema = z.object({
    body: z.object({
        status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
        privateNotes: z.string().optional(),
        checkIn: z.string().optional(),
    }),
});

export const CounselingValidations = {
    createCounselingValidationSchema,
    updateCounselingValidationSchema,
};
