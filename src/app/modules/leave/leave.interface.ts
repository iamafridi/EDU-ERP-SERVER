import { Types } from 'mongoose';

export type TLeaveType = 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'unpaid' | 'other';
export type TLeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type TLeave = {
    employee: Types.ObjectId;
    leaveType: TLeaveType;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    reason: string;
    status: TLeaveStatus;
    approvedBy?: Types.ObjectId;
    remarks?: string;
    isDeleted: boolean;
};
