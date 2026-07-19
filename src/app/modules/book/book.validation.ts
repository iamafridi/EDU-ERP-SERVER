import { z } from 'zod';
import { BookCategories } from './book.constant';

const createBookValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }).min(1),
        author: z.string({ message: 'Author is required' }).min(1),
        publisher: z.string().optional(),
        isbn: z.string({ message: 'ISBN is required' }).min(1),
        category: z.enum([...BookCategories] as [string, ...string[]]),
        edition: z.string().optional(),
        publicationYear: z.number().int().optional(),
        quantity: z.number().int().min(0),
        availableQuantity: z.number().int().min(0),
        shelfLocation: z.string().optional(),
        qrTag: z.string().optional(),
    }),
});

const updateBookValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        author: z.string().min(1).optional(),
        publisher: z.string().optional(),
        isbn: z.string().min(1).optional(),
        category: z.enum([...BookCategories] as [string, ...string[]]).optional(),
        edition: z.string().optional(),
        publicationYear: z.number().int().optional(),
        quantity: z.number().int().min(0).optional(),
        availableQuantity: z.number().int().min(0).optional(),
        shelfLocation: z.string().optional(),
        qrTag: z.string().optional(),
    }),
});

export const BookValidations = {
    createBookValidationSchema,
    updateBookValidationSchema,
};
