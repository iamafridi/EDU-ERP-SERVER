import { z } from 'zod';
import { LaundryStatus } from './laundry.constant';

const createLaundryValidationSchema = z.object({
    body: z.object({
        pickupDate: z.string().datetime(),
        items: z.array(z.string({ message: 'Item must be a string' })).min(1),
    }),
});

const updateLaundryValidationSchema = z.object({
    body: z.object({
        deliveryDate: z.string().datetime().optional(),
        status: z.enum([...LaundryStatus] as [string, ...string[]]).optional(),
        totalAmount: z.number().optional(),
    }),
});

export const LaundryValidations = {
    createLaundryValidationSchema,
    updateLaundryValidationSchema,
};
