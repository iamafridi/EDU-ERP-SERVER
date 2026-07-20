import { z } from 'zod';
import { AppointmentStatuses } from './opd.constant';

const createAppointmentValidationSchema = z.object({
    body: z.object({
        patientId: z.string({ message: 'Patient ID is required' }),
        doctorId: z.string({ message: 'Doctor ID is required' }),
        appointmentDate: z.string().datetime(),
        timeSlot: z.string({ message: 'Time slot is required' }),
        chiefComplaint: z.string({ message: 'Chief complaint is required' }).min(1),
        notes: z.string().optional(),
    }),
});

const updateAppointmentStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...AppointmentStatuses] as [string, ...string[]]),
        notes: z.string().optional(),
    }),
});

const createVisitValidationSchema = z.object({
    body: z.object({
        appointmentId: z.string({ message: 'Appointment ID is required' }),
        patientId: z.string({ message: 'Patient ID is required' }),
        doctorId: z.string({ message: 'Doctor ID is required' }),
        symptoms: z.string({ message: 'Symptoms are required' }).min(1),
        diagnosis: z.string({ message: 'Diagnosis is required' }).min(1),
        investigations: z.string().optional(),
        prescription: z.string().optional(),
        followUpDate: z.string().datetime().optional(),
        notes: z.string().optional(),
    }),
});

const updateVisitValidationSchema = z.object({
    body: z.object({
        symptoms: z.string().optional(),
        diagnosis: z.string().optional(),
        investigations: z.string().optional(),
        prescription: z.string().optional(),
        followUpDate: z.string().datetime().optional(),
        notes: z.string().optional(),
    }),
});

export const OPDValidations = {
    createAppointmentValidationSchema,
    updateAppointmentStatusValidationSchema,
    createVisitValidationSchema,
    updateVisitValidationSchema,
};
