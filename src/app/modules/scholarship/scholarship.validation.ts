import { z } from 'zod';
import { ScholarshipTypes } from './scholarship.constant';

const createScholarshipValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        name: z.string({ message: 'Scholarship name is required' }).min(1),
        type: z.enum([...ScholarshipTypes] as [string, ...string[]]),
        amount: z.number().min(0),
        isPercentage: z.boolean().optional(),
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        documents: z.array(z.string()).optional(),
        remarks: z.string().optional(),
    }),
});

const updateScholarshipValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        type: z.enum([...ScholarshipTypes] as [string, ...string[]]).optional(),
        amount: z.number().min(0).optional(),
        isPercentage: z.boolean().optional(),
        documents: z.array(z.string()).optional(),
        remarks: z.string().optional(),
    }),
});

export const ScholarshipValidations = {
    createScholarshipValidationSchema,
    updateScholarshipValidationSchema,
};
