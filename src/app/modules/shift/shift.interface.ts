import { Types } from 'mongoose';

export type TShiftType = 'morning' | 'afternoon' | 'night' | 'custom';
export type TShiftStatus = 'scheduled' | 'completed' | 'missed';

export type TShift = {
    employee: Types.ObjectId;
    shiftDate: Date;
    startTime: string;
    endTime: string;
    location?: string;
    shiftType: TShiftType;
    status: TShiftStatus;
    notes?: string;
    isDeleted: boolean;
};
