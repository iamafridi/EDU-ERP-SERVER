import { z } from 'zod';
import { DaysOfWeek, MealTypes, MealPlanTypes } from './mess.constant';

const createMenuValidationSchema = z.object({
    body: z.object({
        day: z.enum([...DaysOfWeek] as [string, ...string[]]),
        mealType: z.enum([...MealTypes] as [string, ...string[]]),
        items: z.array(z.string()),
        date: z.string().datetime().optional(),
    }),
});

const updateMenuValidationSchema = z.object({
    body: z.object({
        day: z.enum([...DaysOfWeek] as [string, ...string[]]).optional(),
        mealType: z.enum([...MealTypes] as [string, ...string[]]).optional(),
        items: z.array(z.string()).optional(),
        date: z.string().datetime().optional(),
    }),
});

const createMealPlanValidationSchema = z.object({
    body: z.object({
        plan: z.enum([...MealPlanTypes] as [string, ...string[]]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
    }),
});

const updateMealPlanValidationSchema = z.object({
    body: z.object({
        plan: z.enum([...MealPlanTypes] as [string, ...string[]]).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        isActive: z.boolean().optional(),
    }),
});

const createFeedbackValidationSchema = z.object({
    body: z.object({
        menu: z.string({ message: 'Menu ID is required' }),
        rating: z.number().min(1).max(5),
        comment: z.string({ message: 'Comment must be a string' }).optional(),
        date: z.string().datetime(),
    }),
});

const createBillValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        month: z.number().min(1).max(12),
        year: z.number(),
        totalMeals: z.number().min(1),
        ratePerMeal: z.number().min(0),
        dueDate: z.string().datetime(),
    }),
});

const updateBillValidationSchema = z.object({
    body: z.object({
        paid: z.boolean().optional(),
        paidAt: z.string().datetime().optional(),
    }),
});

export const MessValidations = {
    createMenuValidationSchema,
    updateMenuValidationSchema,
    createMealPlanValidationSchema,
    updateMealPlanValidationSchema,
    createFeedbackValidationSchema,
    createBillValidationSchema,
    updateBillValidationSchema,
};
