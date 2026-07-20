import { z } from 'zod';

const createVisitorLogValidationSchema = z.object({
    body: z.object({
        visitorName: z.string({ message: 'Visitor name must be a string' }).min(1),
        contactNo: z.string({ message: 'Contact number must be a string' }).min(1),
        email: z.string({ message: 'Email must be a string' }).email().optional(),
        student: z.string({ message: 'Student ID must be a string' }).optional(),
        purpose: z.string({ message: 'Purpose must be a string' }).min(1),
        vehicleNumber: z.string({ message: 'Vehicle number must be a string' }).optional(),
        idProof: z.string({ message: 'ID proof must be a string' }).optional(),
    }),
});

const updateVisitorLogValidationSchema = z.object({
    body: z.object({
        visitorName: z.string({ message: 'Visitor name must be a string' }).optional(),
        contactNo: z.string({ message: 'Contact number must be a string' }).optional(),
        email: z.string({ message: 'Email must be a string' }).email().optional(),
        purpose: z.string({ message: 'Purpose must be a string' }).optional(),
        entryTime: z.string().datetime().optional(),
        exitTime: z.string().datetime().optional(),
        vehicleNumber: z.string({ message: 'Vehicle number must be a string' }).optional(),
        idProof: z.string({ message: 'ID proof must be a string' }).optional(),
        preApproved: z.boolean().optional(),
    }),
});

export const VisitorLogValidations = {
    createVisitorLogValidationSchema,
    updateVisitorLogValidationSchema,
};
