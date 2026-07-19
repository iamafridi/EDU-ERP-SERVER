import { z } from 'zod';

const inspectionItemSchema = z.object({
    item: z.string({ message: 'Item name must be a string' }).min(1),
    condition: z.string({ message: 'Condition must be a string' }).min(1),
    notes: z.string({ message: 'Notes must be a string' }).optional(),
});

const createHostelValidationSchema = z.object({
    body: z.object({
        room: z.string({ message: 'Room ID is required' }),
        checkInDate: z.string().datetime(),
        depositAmount: z.number().optional(),
        depositPaid: z.boolean().optional(),
        inspectionChecklist: z.array(inspectionItemSchema).optional(),
    }),
});

const updateHostelValidationSchema = z.object({
    body: z.object({
        room: z.string({ message: 'Room ID must be a string' }).optional(),
        checkOutDate: z.string().datetime().optional(),
        depositAmount: z.number().optional(),
        depositPaid: z.boolean().optional(),
        depositRefunded: z.boolean().optional(),
        inspectionChecklist: z.array(inspectionItemSchema).optional(),
        status: z.enum(['checked-in', 'checked-out']).optional(),
    }),
});

export const HostelValidations = {
    createHostelValidationSchema,
    updateHostelValidationSchema,
};
