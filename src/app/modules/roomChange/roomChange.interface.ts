import { Types } from 'mongoose';

export type TRoomChangeStatus = 'pending' | 'approved' | 'rejected';

export type TRoomChangeRequest = {
    student: Types.ObjectId;
    currentRoom: Types.ObjectId;
    requestedRoom: Types.ObjectId;
    reason: string;
    status: TRoomChangeStatus;
    approvedBy?: Types.ObjectId;
    approvalDate?: Date;
    remarks?: string;
    isDeleted: boolean;
};
