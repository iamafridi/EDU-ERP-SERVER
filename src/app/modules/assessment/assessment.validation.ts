import { z } from 'zod';
import { AssessmentTypes } from './assessment.constant';

const createAssessmentValidationSchema = z.object({
    body: z.object({
        course: z.string({ message: 'Course ID is required' }),
        academicSemester: z.string({ message: 'Academic Semester ID is required' }),
        title: z.string({ message: 'Title is required' }).min(1),
        type: z.enum([...AssessmentTypes] as [string, ...string[]]),
        maxMarks: z.number({ message: 'Max marks is required' }).min(1),
        weightage: z.number({ message: 'Weightage is required' }).min(0).max(100),
        date: z.string().datetime(),
    }),
});

const updateAssessmentValidationSchema = z.object({
    body: z.object({
        course: z.string().optional(),
        academicSemester: z.string().optional(),
        title: z.string().optional(),
        type: z.enum([...AssessmentTypes] as [string, ...string[]]).optional(),
        maxMarks: z.number().optional(),
        weightage: z.number().optional(),
        date: z.string().datetime().optional(),
    }),
});

const createAssessmentScoreValidationSchema = z.object({
    body: z.object({
        assessment: z.string({ message: 'Assessment ID is required' }),
        student: z.string({ message: 'Student ID is required' }),
        marksObtained: z.number({ message: 'Marks obtained is required' }).min(0),
        gradedBy: z.string({ message: 'Graded by is required' }),
        remarks: z.string().optional(),
    }),
});

const bulkCreateAssessmentScoreValidationSchema = z.object({
    body: z.object({
        assessment: z.string({ message: 'Assessment ID is required' }),
        scores: z.array(z.object({
            student: z.string({ message: 'Student ID is required' }),
            marksObtained: z.number({ message: 'Marks obtained is required' }).min(0),
            remarks: z.string().optional(),
        })),
        gradedBy: z.string({ message: 'Graded by is required' }),
    }),
});

const createGradeBookValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        course: z.string({ message: 'Course ID is required' }),
        academicSemester: z.string({ message: 'Academic Semester ID is required' }),
    }),
});

export const AssessmentValidations = {
    createAssessmentValidationSchema,
    updateAssessmentValidationSchema,
    createAssessmentScoreValidationSchema,
    bulkCreateAssessmentScoreValidationSchema,
    createGradeBookValidationSchema,
};
