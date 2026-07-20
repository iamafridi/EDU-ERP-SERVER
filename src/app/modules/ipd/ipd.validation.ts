import { z } from 'zod';
import { WardTypes, DischargeTypes } from './ipd.constant';

const createAdmissionValidationSchema = z.object({
    body: z.object({
        patientId: z.string({ message: 'Patient ID is required' }),
        doctorId: z.string({ message: 'Doctor ID is required' }),
        ward: z.enum([...WardTypes] as [string, ...string[]]),
        bedNumber: z.string({ message: 'Bed number is required' }),
        admissionDate: z.string().datetime(),
        diagnosis: z.string({ message: 'Diagnosis is required' }).min(1),
        notes: z.string().optional(),
    }),
});

const updateAdmissionValidationSchema = z.object({
    body: z.object({
        ward: z.enum([...WardTypes] as [string, ...string[]]).optional(),
        bedNumber: z.string().optional(),
        diagnosis: z.string().optional(),
        notes: z.string().optional(),
    }),
});

const dischargePatientValidationSchema = z.object({
    body: z.object({
        dischargeDate: z.string().datetime(),
        dischargeType: z.enum([...DischargeTypes] as [string, ...string[]]),
        dischargeSummary: z.string({ message: 'Discharge summary is required' }).min(1),
        followUpInstructions: z.string().optional(),
    }),
});

export const IPDValidations = {
    createAdmissionValidationSchema,
    updateAdmissionValidationSchema,
    dischargePatientValidationSchema,
};
