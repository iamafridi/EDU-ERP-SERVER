import { Types } from 'mongoose';

export type TTranscript = {
    student: Types.ObjectId;
    academicSemester: Types.ObjectId;
    totalCredits: number;
    earnedCredits: number;
    sgpa?: number;
    cgpa?: number;
    grades: Types.ObjectId[];
    generatedAt: Date;
    verified: boolean;
    verifiedBy?: Types.ObjectId;
    qrToken?: string;
    isDeleted: boolean;
};
