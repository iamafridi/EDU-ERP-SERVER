import { Types } from 'mongoose';

export type TGrade = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    exam: Types.ObjectId;
    academicSemester: Types.ObjectId;
    marksObtained: number;
    totalMarks: number;
    grade?: string;
    gradePoint?: number;
    isDeleted: boolean;
};
