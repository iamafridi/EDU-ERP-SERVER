import { Types } from 'mongoose';

export type TAssessmentType = 'quiz' | 'assignment' | 'sessional' | 'viva';

export type TAssessment = {
    course: Types.ObjectId;
    academicSemester: Types.ObjectId;
    title: string;
    type: TAssessmentType;
    maxMarks: number;
    weightage: number;
    date: Date;
    isDeleted: boolean;
};

export type TAssessmentScore = {
    assessment: Types.ObjectId;
    student: Types.ObjectId;
    marksObtained: number;
    gradedBy: Types.ObjectId;
    remarks?: string;
    isDeleted: boolean;
};

export type TGradeBookEntry = {
    assessment: Types.ObjectId;
    marksObtained: number;
    weightage: number;
};

export type TGradeBook = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    academicSemester: Types.ObjectId;
    assessments: TGradeBookEntry[];
    totalMarks: number;
    grade: string;
    gpa: number;
    isDeleted: boolean;
};
