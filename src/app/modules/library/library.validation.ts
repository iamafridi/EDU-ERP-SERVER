import { z } from 'zod';
import { BorrowerTypes } from './library.constant';

const createLibraryIssueValidationSchema = z.object({
    body: z.object({
        book: z.string({ message: 'Book ID is required' }),
        borrower: z.string({ message: 'Borrower ID is required' }),
        borrowerType: z.enum([...BorrowerTypes] as [string, ...string[]]),
        issueDate: z.string().datetime(),
        dueDate: z.string().datetime(),
        remarks: z.string().optional(),
    }),
});

const returnBookValidationSchema = z.object({
    body: z.object({
        returnDate: z.string().datetime().optional(),
        fine: z.number().min(0).optional(),
    }),
});

export const LibraryValidations = {
    createLibraryIssueValidationSchema,
    returnBookValidationSchema,
};
