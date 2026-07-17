import { Types } from 'mongoose';

export type TAttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export type TAttendance = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    academicSemester: Types.ObjectId;
    date: Date;
    status: TAttendanceStatus;
    period?: number;
    isDeleted: boolean;
};
