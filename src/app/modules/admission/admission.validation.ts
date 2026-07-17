import { z } from 'zod';
import { ApplicationStatus, Gender } from './admission.constant';

const documentSchema = z.object({
    name: z.string({ message: 'Document name must be a string' }),
    url: z.string({ message: 'Document URL must be a string' }),
});

const createApplicationValidationSchema = z.object({
    body: z.object({
        firstName: z.string({ message: 'First name must be a string' }),
        lastName: z.string({ message: 'Last name must be a string' }),
        email: z.string({ message: 'Email must be a string' }).email(),
        phone: z.string({ message: 'Phone must be a string' }),
        dateOfBirth: z.string().datetime(),
        gender: z.enum([...Gender] as [string, ...string[]]),
        address: z.string({ message: 'Address must be a string' }),
        city: z.string({ message: 'City must be a string' }),
        state: z.string({ message: 'State must be a string' }),
        pincode: z.string({ message: 'Pincode must be a string' }),
        previousSchool: z.string({ message: 'Previous school must be a string' }).optional(),
        previousGrade: z.string({ message: 'Previous grade must be a string' }).optional(),
        applyingFor: z.string({ message: 'Applying for must be a string' }),
        academicYear: z.string({ message: 'Academic year must be a string' }),
        documents: z.array(documentSchema).optional(),
    }),
});

const updateApplicationStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...ApplicationStatus] as [string, ...string[]]),
        reviewNotes: z.string({ message: 'Review notes must be a string' }).optional(),
    }),
});

const createMeritListValidationSchema = z.object({
    body: z.object({
        application: z.string({ message: 'Application ID must be a string' }),
        rank: z.number({ message: 'Rank must be a number' }),
        meritScore: z.number({ message: 'Merit score must be a number' }),
        category: z.string({ message: 'Category must be a string' }),
    }),
});

export const AdmissionValidations = {
    createApplicationValidationSchema,
    updateApplicationStatusValidationSchema,
    createMeritListValidationSchema,
};
