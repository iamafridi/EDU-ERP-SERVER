import { z } from 'zod';
import { PatientGenders } from './patientEncounter.constant';

const createPatientEncounterValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        patientName: z.string({ message: 'Patient name is required' }).min(1),
        patientAge: z.number().min(0),
        patientGender: z.enum([...PatientGenders] as [string, ...string[]]),
        diagnosis: z.string({ message: 'Diagnosis is required' }).min(1),
        procedures: z.array(z.string()).optional(),
        date: z.string().datetime(),
        supervisedBy: z.string({ message: 'Supervising faculty ID is required' }),
        department: z.string({ message: 'Department is required' }).min(1),
        notes: z.string().optional(),
    }),
});

const updatePatientEncounterValidationSchema = z.object({
    body: z.object({
        diagnosis: z.string().min(1).optional(),
        procedures: z.array(z.string()).optional(),
        notes: z.string().optional(),
    }),
});

export const PatientEncounterValidations = {
    createPatientEncounterValidationSchema,
    updatePatientEncounterValidationSchema,
};
