import { z } from 'zod';

const createNurseValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ message: 'Last name is required' }),
        }),
        email: z.string({ message: 'Email is required' }).email(),
        contactNo: z.string({ message: 'Contact number is required' }),
        department: z.string().optional(),
        qualification: z.string().optional(),
        shift: z.enum(['day', 'night', 'rotating']).optional(),
        profileImg: z.string().optional(),
    }),
});

const updateNurseValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z.string().optional(),
                middleName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        contactNo: z.string().optional(),
        department: z.string().optional(),
        qualification: z.string().optional(),
        shift: z.enum(['day', 'night', 'rotating']).optional(),
        profileImg: z.string().optional(),
    }),
});

export const NurseValidations = {
    createNurseValidationSchema,
    updateNurseValidationSchema,
};
