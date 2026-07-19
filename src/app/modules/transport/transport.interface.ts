import { Types } from 'mongoose';

export type TVehicleStatus = 'active' | 'maintenance' | 'retired';

export type TVehicle = {
    vehicleNumber: string;
    registrationNumber: string;
    model: string;
    capacity: number;
    driverName: string;
    driverContact: string;
    status: TVehicleStatus;
    isDeleted: boolean;
};

export type TRouteStop = {
    stopName: string;
    arrivalTime: string;
    order: number;
};

export type TTransportRoute = {
    routeName: string;
    description?: string;
    vehicle: Types.ObjectId;
    stops: TRouteStop[];
    isActive: boolean;
    isDeleted: boolean;
};

export type TTransportFee = {
    route: Types.ObjectId;
    amount: number;
    academicYear: string;
    semester: string;
    isDeleted: boolean;
};
