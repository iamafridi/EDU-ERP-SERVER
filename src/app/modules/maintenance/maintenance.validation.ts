import { z } from 'zod';
import { ComplaintPriority, ComplaintStatus } from './maintenance.constant';

const createComplaintValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title must be a string' }),
        description: z.string({ message: 'Description must be a string' }),
        location: z.string({ message: 'Location must be a string' }),
        priority: z.enum([...ComplaintPriority] as [string, ...string[]]).optional(),
    }),
});

const updateComplaintStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...ComplaintStatus] as [string, ...string[]]),
        assignedTo: z.string({ message: 'Assigned to must be a string' }).optional(),
        resolutionNotes: z.string({ message: 'Resolution notes must be a string' }).optional(),
    }),
});

export const MaintenanceValidations = {
    createComplaintValidationSchema,
    updateComplaintStatusValidationSchema,
};
