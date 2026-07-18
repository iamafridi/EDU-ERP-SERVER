import { z } from 'zod';

const createParentValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ message: 'Last name is required' }),
        }),
        email: z.string({ message: 'Email is required' }).email(),
        contactNo: z.string({ message: 'Contact number is required' }),
        children: z.array(z.string()).optional(),
        address: z.string().optional(),
        occupation: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

const updateParentValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z.string().optional(),
                middleName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        contactNo: z.string().optional(),
        children: z.array(z.string()).optional(),
        address: z.string().optional(),
        occupation: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

export const ParentValidations = {
    createParentValidationSchema,
    updateParentValidationSchema,
};
