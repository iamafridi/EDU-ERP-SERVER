import { z } from 'zod';
import { NotificationTypes, NotificationChannels } from './notification.constant';

const createNotificationValidationSchema = z.object({
    body: z.object({
        recipient: z.string({ message: 'Recipient ID is required' }),
        type: z.enum([...NotificationTypes] as [string, ...string[]]),
        title: z.string({ message: 'Title is required' }).min(1),
        message: z.string({ message: 'Message is required' }).min(1),
        data: z.record(z.string(), z.any()).optional(),
        channel: z.enum([...NotificationChannels] as [string, ...string[]]).optional(),
    }),
});

export const NotificationValidations = {
    createNotificationValidationSchema,
};
