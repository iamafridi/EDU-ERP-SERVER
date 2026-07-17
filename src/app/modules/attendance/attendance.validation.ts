import { z } from 'zod';
import { AttendanceStatus } from './attendance.constant';

const createAttendanceValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        course: z.string({ message: 'Course ID is required' }),
        date: z.string().datetime(),
        status: z.enum([...AttendanceStatus] as [string, ...string[]]),
        period: z.number().optional(),
    }),
});

const bulkAttendanceValidationSchema = z.object({
    body: z.object({
        course: z.string({ message: 'Course ID is required' }),
        date: z.string().datetime(),
        records: z.array(
            z.object({
                student: z.string({ message: 'Student ID is required' }),
                status: z.enum([...AttendanceStatus] as [string, ...string[]]),
            }),
        ).min(1),
    }),
});

const updateAttendanceValidationSchema = z.object({
    body: z.object({
        status: z.enum([...AttendanceStatus] as [string, ...string[]]),
        period: z.number().optional(),
    }),
});

const bulkDateRangeAttendanceValidationSchema = z.object({
    body: z.object({
        course: z.string({ message: 'Course ID is required' }),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        students: z.array(
            z.object({
                student: z.string({ message: 'Student ID is required' }),
                status: z.enum([...AttendanceStatus] as [string, ...string[]]),
            }),
        ).min(1),
    }),
});

export const AttendanceValidations = {
    createAttendanceValidationSchema,
    bulkAttendanceValidationSchema,
    updateAttendanceValidationSchema,
    bulkDateRangeAttendanceValidationSchema,
};
