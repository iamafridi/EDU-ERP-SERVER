import { z } from 'zod';
import { RotationStatuses } from './clinicalRotation.constant';

const createClinicalRotationValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        department: z.string({ message: 'Department is required' }).min(1),
        faculty: z.string({ message: 'Faculty ID is required' }),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        totalHours: z.number().min(0),
    }),
});

const updateClinicalRotationValidationSchema = z.object({
    body: z.object({
        department: z.string().min(1).optional(),
        totalHours: z.number().min(0).optional(),
        loggedHours: z.number().min(0).optional(),
        status: z.enum([...RotationStatuses] as [string, ...string[]]).optional(),
    }),
});

export const ClinicalRotationValidations = {
    createClinicalRotationValidationSchema,
    updateClinicalRotationValidationSchema,
};
