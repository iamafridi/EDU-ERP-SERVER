import { z } from 'zod';

const sendMessageValidationSchema = z.object({
    body: z.object({
        conversation: z.string({ message: 'Conversation ID must be a string' }),
        content: z.string({ message: 'Content must be a string' }),
        attachments: z
            .array(
                z.object({
                    name: z.string({ message: 'Attachment name must be a string' }),
                    url: z.string({ message: 'Attachment URL must be a string' }),
                }),
            )
            .optional(),
    }),
});

const createConversationValidationSchema = z.object({
    body: z.object({
        participants: z
            .array(z.string({ message: 'Participant ID must be a string' }))
            .min(2, 'At least 2 participants required'),
    }),
});

export const ChatValidations = {
    sendMessageValidationSchema,
    createConversationValidationSchema,
};
