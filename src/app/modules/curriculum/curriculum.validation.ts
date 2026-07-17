import { z } from 'zod';
import { CognitiveLevels } from './curriculum.constant';

const createCourseOutcomeValidationSchema = z.object({
    body: z.object({
        course: z.string({ message: 'Course ID is required' }),
        code: z.string({ message: 'Code is required' }).min(1),
        description: z.string({ message: 'Description is required' }).min(1),
        cognitiveLevel: z.enum([...CognitiveLevels] as [string, ...string[]]),
    }),
});

const updateCourseOutcomeValidationSchema = z.object({
    body: z.object({
        course: z.string().optional(),
        code: z.string().optional(),
        description: z.string().optional(),
        cognitiveLevel: z.enum([...CognitiveLevels] as [string, ...string[]]).optional(),
    }),
});

const createProgramOutcomeValidationSchema = z.object({
    body: z.object({
        code: z.string({ message: 'Code is required' }).min(1),
        description: z.string({ message: 'Description is required' }).min(1),
    }),
});

const updateProgramOutcomeValidationSchema = z.object({
    body: z.object({
        code: z.string().optional(),
        description: z.string().optional(),
    }),
});

const curriculumTopicSchema = z.object({
    title: z.string({ message: 'Topic title is required' }).min(1),
    hours: z.number({ message: 'Hours is required' }).min(0),
    cos: z.array(z.string()).optional().default([]),
});

const createCurriculumMapValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string({ message: 'Academic Semester ID is required' }),
        course: z.string({ message: 'Course ID is required' }),
        courseOutcomes: z.array(z.string()).optional().default([]),
        topics: z.array(curriculumTopicSchema).optional().default([]),
        textbooks: z.array(z.string()).optional().default([]),
        referenceBooks: z.array(z.string()).optional().default([]),
    }),
});

const updateCurriculumMapValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        course: z.string().optional(),
        courseOutcomes: z.array(z.string()).optional(),
        topics: z.array(curriculumTopicSchema).optional(),
        textbooks: z.array(z.string()).optional(),
        referenceBooks: z.array(z.string()).optional(),
    }),
});

export const CurriculumValidations = {
    createCourseOutcomeValidationSchema,
    updateCourseOutcomeValidationSchema,
    createProgramOutcomeValidationSchema,
    updateProgramOutcomeValidationSchema,
    createCurriculumMapValidationSchema,
    updateCurriculumMapValidationSchema,
};
