import { Types } from 'mongoose';

export type TExamType = 'midterm' | 'final' | 'quiz' | 'practical';

export type TExam = {
    title: string;
    course: Types.ObjectId;
    academicSemester: Types.ObjectId;
    type: TExamType;
    date: Date;
    startTime: string;
    endTime: string;
    totalMarks: number;
    hallTicketGenerated: boolean;
    isDeleted: boolean;
};
