import { z } from 'zod';

const RoomFacilityValidationSchema = z.object({
    facility: z.string(),
    isDeleted: z.boolean().optional(),
});

const createRoomValidationSchema = z.object({
    body: z.object({
        roomNumber: z.string(),
        building: z.string(),
        floor: z.number(),
        capacity: z.number(),
        monthlyRent: z.number(),
        roomFacilities: z.array(RoomFacilityValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    }),
});

const updateRoomFacilityValidationSchema = z.object({
    facility: z.string(),
    isDeleted: z.boolean().optional(),
});

const updateRoomValidationSchema = z.object({
    body: z.object({
        roomNumber: z.string().optional(),
        building: z.string().optional(),
        floor: z.number().optional(),
        capacity: z.number().optional(),
        monthlyRent: z.number().optional(),
        roomFacilities: z
            .array(updateRoomFacilityValidationSchema)
            .optional(),
        isDeleted: z.boolean().optional(),
    }),
});

const studentsWithRoomValidationSchema = z.object({
    body: z.object({
        students: z.array(z.string()),
    }),
});

const createRoomAllocationValidationSchema = z.object({
    body: z.object({
        preferredBuilding: z.string({ message: 'Building must be a string' }).optional(),
        preferredFloor: z.number().optional(),
        requiresAC: z.boolean().optional(),
    }),
});

const approveRoomAllocationValidationSchema = z.object({
    body: z.object({
        assignedRoom: z.string({ message: 'Assigned room ID is required' }),
        status: z.enum(['approved', 'rejected']),
        remarks: z.string({ message: 'Remarks must be a string' }).optional(),
    }),
});

export const RoomValidations = {
    createRoomValidationSchema,
    updateRoomValidationSchema,
    studentsWithRoomValidationSchema,
    createRoomAllocationValidationSchema,
    approveRoomAllocationValidationSchema,
};