import { Types } from 'mongoose';

export type TCounselingType = 'individual' | 'group' | 'emergency';
export type TCounselingMode = 'in-person' | 'online' | 'phone';
export type TCounselingStatus = 'scheduled' | 'completed' | 'cancelled';

export type TCounseling = {
    student: Types.ObjectId;
    counselor: Types.ObjectId;
    sessionDate: Date;
    type: TCounselingType;
    mode: TCounselingMode;
    status: TCounselingStatus;
    privateNotes?: string;
    checkIn?: string;
    isDeleted: boolean;
};
