import { z } from 'zod';
import { InventoryCategory, ItemCondition } from './inventory.constant';

const createInventoryValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Item name must be a string' }).min(1),
        category: z.enum([...InventoryCategory] as [string, ...string[]]),
        room: z.string({ message: 'Room ID must be a string' }).optional(),
        quantity: z.number().min(0),
        condition: z.enum([...ItemCondition] as [string, ...string[]]).optional(),
        notes: z.string({ message: 'Notes must be a string' }).optional(),
    }),
});

const updateInventoryValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Item name must be a string' }).optional(),
        category: z.enum([...InventoryCategory] as [string, ...string[]]).optional(),
        room: z.string({ message: 'Room ID must be a string' }).optional(),
        quantity: z.number().min(0).optional(),
        condition: z.enum([...ItemCondition] as [string, ...string[]]).optional(),
        notes: z.string({ message: 'Notes must be a string' }).optional(),
    }),
});

export const InventoryValidations = {
    createInventoryValidationSchema,
    updateInventoryValidationSchema,
};
