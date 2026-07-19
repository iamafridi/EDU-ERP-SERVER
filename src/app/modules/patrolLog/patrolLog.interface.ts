import { Types } from 'mongoose';

export type TPatrolStatus = 'on-time' | 'missed' | 'late';

export type TPatrolLog = {
    guard: Types.ObjectId;
    checkpoint: string;
    scanTime: Date;
    status: TPatrolStatus;
    notes?: string;
    isDeleted: boolean;
};
