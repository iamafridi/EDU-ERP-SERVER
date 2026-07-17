import { Types } from 'mongoose';

export type TApplicationStatus = 'draft' | 'submitted' | 'under-review' | 'shortlisted' | 'accepted' | 'rejected';

export type TAdmissionApplication = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    address: string;
    city: string;
    state: string;
    pincode: string;
    previousSchool?: string;
    previousGrade?: string;
    applyingFor: Types.ObjectId;
    academicYear: string;
    documents: {
        name: string;
        url: string;
    }[];
    status: TApplicationStatus;
    reviewedBy?: Types.ObjectId;
    reviewNotes?: string;
    isDeleted: boolean;
};

export type TMeritList = {
    application: Types.ObjectId;
    rank: number;
    meritScore: number;
    category: string;
    isAllotted: boolean;
    allottedSeat?: Types.ObjectId;
    isDeleted: boolean;
};
