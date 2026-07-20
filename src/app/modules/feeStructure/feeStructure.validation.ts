import { z } from 'zod';
import { FeeCategories } from './feeStructure.constant';

const createFeeStructureValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Name is required' }).min(1),
        amount: z.number().min(0),
        category: z.enum([...FeeCategories] as [string, ...string[]]),
        academicSemester: z.string({ message: 'Academic semester ID is required' }),
        applicableTo: z.array(z.string()).optional(),
        isOptional: z.boolean().optional(),
    }),
});

const updateFeeStructureValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        amount: z.number().min(0).optional(),
        category: z.enum([...FeeCategories] as [string, ...string[]]).optional(),
        applicableTo: z.array(z.string()).optional(),
        isOptional: z.boolean().optional(),
    }),
});

export const FeeStructureValidations = {
    createFeeStructureValidationSchema,
    updateFeeStructureValidationSchema,
};
