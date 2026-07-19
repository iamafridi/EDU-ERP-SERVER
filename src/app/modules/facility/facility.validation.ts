import { z } from 'zod';

const createFacilityValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Facility name must be a string' }),
        description: z.string({ message: 'Description must be a string' }).optional(),
    }),
});

const updateFacilityValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Facility name must be a string' }).optional(),
        description: z.string({ message: 'Description must be a string' }).optional(),
    }),
});

export const FacilityValidations = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
};
