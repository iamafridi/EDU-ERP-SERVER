import { Types } from 'mongoose';

export type THandover = {
    fromGuard: Types.ObjectId;
    toGuard: Types.ObjectId;
    shift: 'day' | 'night';
    notes: string;
    pendingTasks?: string[];
    handoverTime: Date;
    acknowledged: boolean;
    isDeleted: boolean;
};
