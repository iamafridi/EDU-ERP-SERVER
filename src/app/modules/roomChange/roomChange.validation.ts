import { z } from 'zod';
import { RoomChangeStatus } from './roomChange.constant';

const createRoomChangeValidationSchema = z.object({
    body: z.object({
        currentRoom: z.string({ message: 'Current room ID is required' }),
        requestedRoom: z.string({ message: 'Requested room ID is required' }),
        reason: z.string({ message: 'Reason must be a string' }).min(1),
    }),
});

const updateRoomChangeValidationSchema = z.object({
    body: z.object({
        status: z.enum([...RoomChangeStatus] as [string, ...string[]]),
        remarks: z.string({ message: 'Remarks must be a string' }).optional(),
    }),
});

export const RoomChangeValidations = {
    createRoomChangeValidationSchema,
    updateRoomChangeValidationSchema,
};
