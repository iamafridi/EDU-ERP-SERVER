import { z } from 'zod';
import { LeaveTypes } from './leave.constant';

const createLeaveValidationSchema = z.object({
    body: z.object({
        employee: z.string({ message: 'Employee ID is required' }),
        leaveType: z.enum([...LeaveTypes] as [string, ...string[]]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        totalDays: z.number().int().min(1),
        reason: z.string({ message: 'Reason is required' }).min(1),
    }),
});

const updateLeaveValidationSchema = z.object({
    body: z.object({
        leaveType: z.enum([...LeaveTypes] as [string, ...string[]]).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        totalDays: z.number().int().min(1).optional(),
        reason: z.string().min(1).optional(),
        remarks: z.string().optional(),
    }),
});

export const LeaveValidations = {
    createLeaveValidationSchema,
    updateLeaveValidationSchema,
};
