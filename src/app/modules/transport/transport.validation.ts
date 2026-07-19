import { z } from 'zod';
import { VehicleStatus } from './transport.constant';

const stopSchema = z.object({
    stopName: z.string({ message: 'Stop name must be a string' }),
    arrivalTime: z.string({ message: 'Arrival time must be a string' }),
    order: z.number({ message: 'Order must be a number' }),
});

const createVehicleValidationSchema = z.object({
    body: z.object({
        vehicleNumber: z.string({ message: 'Vehicle number must be a string' }),
        registrationNumber: z.string({ message: 'Registration number must be a string' }),
        model: z.string({ message: 'Model must be a string' }),
        capacity: z.number({ message: 'Capacity must be a number' }),
        driverName: z.string({ message: 'Driver name must be a string' }),
        driverContact: z.string({ message: 'Driver contact must be a string' }),
        status: z.enum([...VehicleStatus] as [string, ...string[]]).optional(),
    }),
});

const updateVehicleValidationSchema = z.object({
    body: z.object({
        vehicleNumber: z.string({ message: 'Vehicle number must be a string' }).optional(),
        registrationNumber: z.string({ message: 'Registration number must be a string' }).optional(),
        model: z.string({ message: 'Model must be a string' }).optional(),
        capacity: z.number({ message: 'Capacity must be a number' }).optional(),
        driverName: z.string({ message: 'Driver name must be a string' }).optional(),
        driverContact: z.string({ message: 'Driver contact must be a string' }).optional(),
        status: z.enum([...VehicleStatus] as [string, ...string[]]).optional(),
    }),
});

const createRouteValidationSchema = z.object({
    body: z.object({
        routeName: z.string({ message: 'Route name must be a string' }),
        description: z.string({ message: 'Description must be a string' }).optional(),
        vehicle: z.string({ message: 'Vehicle ID must be a string' }),
        stops: z.array(stopSchema).min(1, 'At least one stop is required'),
        isActive: z.boolean().optional(),
    }),
});

const updateRouteValidationSchema = z.object({
    body: z.object({
        routeName: z.string({ message: 'Route name must be a string' }).optional(),
        description: z.string({ message: 'Description must be a string' }).optional(),
        vehicle: z.string({ message: 'Vehicle ID must be a string' }).optional(),
        stops: z.array(stopSchema).optional(),
        isActive: z.boolean().optional(),
    }),
});

const createFeeValidationSchema = z.object({
    body: z.object({
        route: z.string({ message: 'Route ID must be a string' }),
        amount: z.number({ message: 'Amount must be a number' }),
        academicYear: z.string({ message: 'Academic year must be a string' }),
        semester: z.string({ message: 'Semester must be a string' }),
    }),
});

const updateFeeValidationSchema = z.object({
    body: z.object({
        amount: z.number({ message: 'Amount must be a number' }).optional(),
        academicYear: z.string({ message: 'Academic year must be a string' }).optional(),
        semester: z.string({ message: 'Semester must be a string' }).optional(),
    }),
});

export const TransportValidations = {
    createVehicleValidationSchema,
    updateVehicleValidationSchema,
    createRouteValidationSchema,
    updateRouteValidationSchema,
    createFeeValidationSchema,
    updateFeeValidationSchema,
};
