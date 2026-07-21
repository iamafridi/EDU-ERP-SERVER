import { Types } from 'mongoose';

export type TRotationStatus = 'scheduled' | 'in-progress' | 'completed';

export type TClinicalRotation = {
    student: Types.ObjectId;
    department: string;
    faculty: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    totalHours: number;
    loggedHours: number;
    status: TRotationStatus;
    isDeleted: boolean;
};
