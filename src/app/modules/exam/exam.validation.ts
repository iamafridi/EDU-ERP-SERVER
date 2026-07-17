import { z } from 'zod';
import { ExamTypes } from './exam.constant';

const createExamValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }).min(1),
        course: z.string({ message: 'Course ID is required' }),
        type: z.enum([...ExamTypes] as [string, ...string[]]),
        date: z.string().datetime(),
        startTime: z.string({ message: 'Start time is required' }),
        endTime: z.string({ message: 'End time is required' }),
        totalMarks: z.number().min(1),
    }),
});

const updateExamValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        course: z.string().optional(),
        type: z.enum([...ExamTypes] as [string, ...string[]]).optional(),
        date: z.string().datetime().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        totalMarks: z.number().optional(),
        hallTicketGenerated: z.boolean().optional(),
    }),
});

export const ExamValidations = {
    createExamValidationSchema,
    updateExamValidationSchema,
};
