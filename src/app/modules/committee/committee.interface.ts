import { Types } from 'mongoose';

export type TCommitteeType = 'anti-ragging' | 'discipline' | 'hostel' | 'academic' | 'ethics' | 'other';

export type TCommitteeMember = {
    member: Types.ObjectId;
    role: string;
};

export type TCommittee = {
    name: string;
    type: TCommitteeType;
    members: TCommitteeMember[];
    description?: string;
    convenor: Types.ObjectId;
    isActive: boolean;
    isDeleted: boolean;
};
