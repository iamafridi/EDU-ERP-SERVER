import { z } from 'zod';
import { TimetableDays, TimetableEntryTypes } from './timetable.constant';

const timetableEntrySchema = z.object({
    day: z.enum([...TimetableDays] as [string, ...string[]]),
    startTime: z.string({ message: 'Start time is required' }),
    endTime: z.string({ message: 'End time is required' }),
    course: z.string({ message: 'Course ID is required' }),
    faculty: z.string({ message: 'Faculty ID is required' }),
    room: z.string({ message: 'Room is required' }).min(1),
    type: z.enum([...TimetableEntryTypes] as [string, ...string[]]),
});

const createTimetableValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string({ message: 'Academic Semester ID is required' }),
        department: z.string({ message: 'Department ID is required' }),
        year: z.number({ message: 'Year is required' }).min(1).max(6),
        section: z.string({ message: 'Section is required' }).min(1),
        entries: z.array(timetableEntrySchema).optional().default([]),
    }),
});

const updateTimetableValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        department: z.string().optional(),
        year: z.number().optional(),
        section: z.string().optional(),
        entries: z.array(timetableEntrySchema).optional(),
    }),
});

const addEntryValidationSchema = z.object({
    body: timetableEntrySchema,
});

export const TimetableValidations = {
    createTimetableValidationSchema,
    updateTimetableValidationSchema,
    addEntryValidationSchema,
};
