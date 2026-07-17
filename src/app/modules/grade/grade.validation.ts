import { z } from 'zod';

const createGradeValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        course: z.string({ message: 'Course ID is required' }),
        exam: z.string({ message: 'Exam ID is required' }),
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        marksObtained: z.number().min(0),
        totalMarks: z.number().min(1),
    }),
});

const updateGradeValidationSchema = z.object({
    body: z.object({
        marksObtained: z.number().min(0).optional(),
        totalMarks: z.number().min(1).optional(),
    }),
});

export const GradeValidations = {
    createGradeValidationSchema,
    updateGradeValidationSchema,
};
