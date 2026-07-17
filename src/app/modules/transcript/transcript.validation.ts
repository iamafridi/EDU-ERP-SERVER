import { z } from 'zod';

const createTranscriptValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        totalCredits: z.number().min(0),
        earnedCredits: z.number().min(0),
        sgpa: z.number().optional(),
        cgpa: z.number().optional(),
        grades: z.array(z.string()).optional(),
    }),
});

const verifyTranscriptValidationSchema = z.object({
    body: z.object({
        verified: z.boolean(),
    }),
});

export const TranscriptValidations = {
    createTranscriptValidationSchema,
    verifyTranscriptValidationSchema,
};
