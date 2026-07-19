import { z } from 'zod';
import { NoticePriorities } from './notice.constant';

const createNoticeValidationSchema = z.object({
    body: z.object({
        title: z.string({ message: 'Title is required' }).min(1),
        content: z.string({ message: 'Content is required' }).min(1),
        targetRoles: z.array(z.string()).optional(),
        targetDepartments: z.array(z.string()).optional(),
        priority: z.enum([...NoticePriorities] as [string, ...string[]]).optional(),
        validFrom: z.string().datetime(),
        validTo: z.string().datetime().optional(),
        attachments: z.array(z.string()).optional(),
    }),
});

const updateNoticeValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        targetRoles: z.array(z.string()).optional(),
        targetDepartments: z.array(z.string()).optional(),
        priority: z.enum([...NoticePriorities] as [string, ...string[]]).optional(),
        validFrom: z.string().datetime().optional(),
        validTo: z.string().datetime().optional(),
        attachments: z.array(z.string()).optional(),
    }),
});

export const NoticeValidations = {
    createNoticeValidationSchema,
    updateNoticeValidationSchema,
};
