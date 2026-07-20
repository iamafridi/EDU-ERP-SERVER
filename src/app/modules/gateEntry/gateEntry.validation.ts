import { z } from 'zod';
import { GateEntryType } from './gateEntry.constant';

const createGateEntryValidationSchema = z.object({
    body: z.object({
        type: z.enum([...GateEntryType] as [string, ...string[]]),
        personName: z.string({ message: 'Person name must be a string' }).optional(),
        student: z.string({ message: 'Student ID must be a string' }).optional(),
        vehicleNumber: z.string({ message: 'Vehicle number must be a string' }).optional(),
        contactNo: z.string({ message: 'Contact number must be a string' }).optional(),
        purpose: z.string({ message: 'Purpose must be a string' }).optional(),
        entryTime: z.string().datetime(),
        exitTime: z.string().datetime().optional(),
        isLateEntry: z.boolean().optional(),
        lateEntryReason: z.string({ message: 'Late entry reason must be a string' }).optional(),
    }),
});

const updateGateEntryValidationSchema = z.object({
    body: z.object({
        exitTime: z.string().datetime().optional(),
        isLateEntry: z.boolean().optional(),
        lateEntryReason: z.string({ message: 'Late entry reason must be a string' }).optional(),
        notified: z.boolean().optional(),
    }),
});

export const GateEntryValidations = {
    createGateEntryValidationSchema,
    updateGateEntryValidationSchema,
};
