import { Types } from 'mongoose';

export type TGrievanceCategory = 'ragging' | 'harassment' | 'academic' | 'hostel' | 'other';
export type TGrievanceStatus = 'submitted' | 'under-review' | 'resolved' | 'closed';

export type TGrievance = {
    complainant: Types.ObjectId;
    isAnonymous: boolean;
    subject: string;
    description: string;
    category: TGrievanceCategory;
    status: TGrievanceStatus;
    assignedTo?: Types.ObjectId;
    resolution?: string;
    resolvedAt?: Date;
    isDeleted: boolean;
};
