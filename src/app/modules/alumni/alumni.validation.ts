import { z } from 'zod';
import { DonationCurrencies } from './alumni.constant';

const createAlumniValidationSchema = z.object({
    body: z.object({
        firstName: z.string({ message: 'First name is required' }).min(1),
        lastName: z.string({ message: 'Last name is required' }).min(1),
        email: z.string({ message: 'Email is required' }).email(),
        phone: z.string().optional(),
        batch: z.string({ message: 'Batch is required' }).min(1),
        department: z.string({ message: 'Department ID is required' }),
        graduationYear: z.number().int(),
        currentEmployer: z.string().optional(),
        currentPosition: z.string().optional(),
        address: z.string().optional(),
        photo: z.string().optional(),
    }),
});

const updateAlumniValidationSchema = z.object({
    body: z.object({
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        phone: z.string().optional(),
        batch: z.string().min(1).optional(),
        department: z.string().optional(),
        currentEmployer: z.string().optional(),
        currentPosition: z.string().optional(),
        address: z.string().optional(),
        photo: z.string().optional(),
    }),
});

const createEventValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }),
        description: z.string({ message: 'Description is required' }),
        date: z.string().datetime(),
        location: z.string({ message: 'Location is required' }),
        maxAttendees: z.number().int().positive().optional(),
    }),
});

const updateEventValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().datetime().optional(),
        location: z.string().optional(),
        maxAttendees: z.number().int().positive().optional(),
    }),
});

const createDonationValidationSchema = z.object({
    body: z.object({
        alumni: z.string({ message: 'Alumni ID is required' }),
        amount: z.number({ message: 'Amount is required' }).positive(),
        currency: z.enum([...DonationCurrencies] as [string, ...string[]]).optional(),
        purpose: z.string({ message: 'Purpose is required' }),
        donationDate: z.string().datetime().optional(),
        paymentMethod: z.string({ message: 'Payment method is required' }),
    }),
});

export const AlumniValidations = {
    createAlumniValidationSchema,
    updateAlumniValidationSchema,
    createEventValidationSchema,
    updateEventValidationSchema,
    createDonationValidationSchema,
};
