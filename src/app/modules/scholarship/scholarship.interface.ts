import { Types } from 'mongoose';

export type TScholarshipType = 'merit' | 'need-based' | 'sports' | 'minority' | 'other';
export type TScholarshipStatus = 'pending' | 'approved' | 'rejected' | 'disbursed';

export type TScholarship = {
    student: Types.ObjectId;
    name: string;
    type: TScholarshipType;
    amount: number;
    isPercentage: boolean;
    academicSemester: Types.ObjectId;
    approvedBy?: Types.ObjectId;
    status: TScholarshipStatus;
    documents: string[];
    remarks?: string;
    isDeleted: boolean;
};
