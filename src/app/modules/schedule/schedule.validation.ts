import { z } from 'zod';
import { ScheduleDays, ScheduleTypes, CalendarEventTypes } from './schedule.constant';

const createScheduleValidationSchema = z.object({
    body: z.object({
        course: z.string({ message: 'Course ID is required' }),
        faculty: z.string({ message: 'Faculty ID is required' }),
        day: z.enum([...ScheduleDays] as [string, ...string[]]),
        startTime: z.string({ message: 'Start time is required' }),
        endTime: z.string({ message: 'End time is required' }),
        room: z.string({ message: 'Room is required' }).min(1),
        building: z.string({ message: 'Building is required' }).min(1),
        type: z.enum([...ScheduleTypes] as [string, ...string[]]),
    }),
});

const updateScheduleValidationSchema = z.object({
    body: z.object({
        course: z.string().optional(),
        faculty: z.string().optional(),
        day: z.enum([...ScheduleDays] as [string, ...string[]]).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        room: z.string().optional(),
        building: z.string().optional(),
        type: z.enum([...ScheduleTypes] as [string, ...string[]]).optional(),
    }),
});

const createCalendarEventValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }).min(1),
        description: z.string().optional(),
        date: z.string().datetime(),
        type: z.enum([...CalendarEventTypes] as [string, ...string[]]),
        targetRoles: z.array(z.string()).optional(),
    }),
});

const updateCalendarEventValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().datetime().optional(),
        type: z.enum([...CalendarEventTypes] as [string, ...string[]]).optional(),
        targetRoles: z.array(z.string()).optional(),
    }),
});

export const ScheduleValidations = {
    createScheduleValidationSchema,
    updateScheduleValidationSchema,
    createCalendarEventValidationSchema,
    updateCalendarEventValidationSchema,
};
