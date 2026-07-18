import { z } from 'zod';

const createLibrarianValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ message: 'Last name is required' }),
        }),
        email: z.string({ message: 'Email is required' }).email(),
        contactNo: z.string({ message: 'Contact number is required' }),
        employeeId: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

const updateLibrarianValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z.string().optional(),
                middleName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        contactNo: z.string().optional(),
        employeeId: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

export const LibrarianValidations = {
    createLibrarianValidationSchema,
    updateLibrarianValidationSchema,
};
