import { z } from 'zod';

const createHealthCenterValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        visitDate: z.string().datetime(),
        symptoms: z.array(z.string()).optional(),
        diagnosis: z.string().optional(),
        prescription: z.string().optional(),
        doctor: z.string({ message: 'Doctor ID is required' }),
        followUpDate: z.string().datetime().optional(),
        medicalLeaveDays: z.number().int().min(0).optional(),
    }),
});

const updateHealthCenterValidationSchema = z.object({
    body: z.object({
        diagnosis: z.string().optional(),
        prescription: z.string().optional(),
        followUpDate: z.string().datetime().optional(),
        medicalLeaveDays: z.number().int().min(0).optional(),
    }),
});

export const HealthCenterValidations = {
    createHealthCenterValidationSchema,
    updateHealthCenterValidationSchema,
};
