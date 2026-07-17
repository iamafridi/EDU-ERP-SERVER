import z from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Department name must be a string' }),
        academicFaculty: z.string({ message: 'Academic faculty must be a string' }),
    }),
});
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Department name must be a string' }).optional(),
        academicFaculty: z.string({ message: 'Academic faculty must be a string' }).optional(),
    }),
});

export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};


//----> Service.js