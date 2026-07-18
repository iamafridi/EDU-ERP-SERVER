import { z } from 'zod';

const createGuardValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ message: 'Last name is required' }),
        }),
        email: z.string({ message: 'Email is required' }).email(),
        contactNo: z.string({ message: 'Contact number is required' }),
        shift: z.enum(['day', 'night', 'rotating']).optional(),
        assignedGate: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

const updateGuardValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z.string().optional(),
                middleName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        contactNo: z.string().optional(),
        shift: z.enum(['day', 'night', 'rotating']).optional(),
        assignedGate: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

export const GuardValidations = {
    createGuardValidationSchema,
    updateGuardValidationSchema,
};
