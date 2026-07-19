import { Types } from 'mongoose';

export type TRoomFacilities = {
    facility: Types.ObjectId;
    isDeleted: boolean;
};

export type TRoom = {
    roomNumber: string;
    building: string;
    floor: number;
    capacity: number;
    monthlyRent: number;
    isDeleted?: boolean;
    roomFacilities: [TRoomFacilities];
};

export type TRoomStudent = {
    room: Types.ObjectId;
    students: [Types.ObjectId];
};

export type TAllocationStatus = 'pending' | 'approved' | 'rejected';

export type TRoomAllocation = {
    student: Types.ObjectId;
    preferredBuilding?: string;
    preferredFloor?: number;
    requiresAC?: boolean;
    status: TAllocationStatus;
    assignedRoom?: Types.ObjectId;
    approvedBy?: Types.ObjectId;
    remarks?: string;
    isDeleted: boolean;
};