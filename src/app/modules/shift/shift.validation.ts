import { z } from 'zod';
import { ShiftTypes } from './shift.constant';

const createShiftValidationSchema = z.object({
    body: z.object({
        employee: z.string({ message: 'Employee ID is required' }),
        shiftDate: z.string().datetime(),
        startTime: z.string({ message: 'Start time is required' }),
        endTime: z.string({ message: 'End time is required' }),
        location: z.string().optional(),
        shiftType: z.enum([...ShiftTypes] as [string, ...string[]]),
        notes: z.string().optional(),
    }),
});

const updateShiftValidationSchema = z.object({
    body: z.object({
        shiftDate: z.string().datetime().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        location: z.string().optional(),
        shiftType: z.enum([...ShiftTypes] as [string, ...string[]]).optional(),
        status: z.enum(['scheduled', 'completed', 'missed']).optional(),
        notes: z.string().optional(),
    }),
});

export const ShiftValidations = {
    createShiftValidationSchema,
    updateShiftValidationSchema,
};
