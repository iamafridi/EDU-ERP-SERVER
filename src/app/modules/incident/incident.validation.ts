import { z } from 'zod';
import { IncidentSeverity, IncidentStatus } from './incident.constant';

const createIncidentValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title must be a string' }).min(1),
        description: z.string({ message: 'Description must be a string' }).min(1),
        severity: z.enum([...IncidentSeverity] as [string, ...string[]]),
        location: z.string({ message: 'Location must be a string' }).min(1),
        assignedTo: z.string({ message: 'Assigned user must be a string' }).optional(),
        photos: z.array(z.string()).optional(),
    }),
});

const updateIncidentValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title must be a string' }).optional(),
        description: z.string({ message: 'Description must be a string' }).optional(),
        severity: z.enum([...IncidentSeverity] as [string, ...string[]]).optional(),
        status: z.enum([...IncidentStatus] as [string, ...string[]]).optional(),
        location: z.string({ message: 'Location must be a string' }).optional(),
        assignedTo: z.string({ message: 'Assigned user must be a string' }).optional(),
        photos: z.array(z.string()).optional(),
        resolution: z.string({ message: 'Resolution must be a string' }).optional(),
    }),
});

export const IncidentValidations = {
    createIncidentValidationSchema,
    updateIncidentValidationSchema,
};
