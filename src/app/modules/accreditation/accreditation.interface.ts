import { Types } from 'mongoose';

export type TAccreditationBody = 'NMC' | 'AICTE' | 'UGC' | 'other';
export type TAccreditationType = 'self-study' | 'inspection' | 'annual-return' | 'audit';
export type TAccreditationStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export type TAccreditation = {
    name: string;
    body: TAccreditationBody;
    type: TAccreditationType;
    status: TAccreditationStatus;
    dueDate: Date;
    submittedDate?: Date;
    data: Record<string, unknown>;
    attachments: string[];
    isDeleted: boolean;
};
