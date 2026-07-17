import { Types } from 'mongoose';

export type TTimetableDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
export type TTimetableEntryType = 'lecture' | 'lab' | 'tutorial';

export type TTimetableEntry = {
    _id?: Types.ObjectId;
    day: TTimetableDay;
    startTime: string;
    endTime: string;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    room: string;
    type: TTimetableEntryType;
};

export type TTimetable = {
    academicSemester: Types.ObjectId;
    department: Types.ObjectId;
    year: number;
    section: string;
    entries: TTimetableEntry[];
    isDeleted: boolean;
};
