import { Types } from 'mongoose';

export type TScheduleDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type TScheduleType = 'lecture' | 'lab' | 'tutorial';
export type TCalendarEventType = 'holiday' | 'exam' | 'event' | 'deadline';

export type TSchedule = {
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    academicSemester: Types.ObjectId;
    day: TScheduleDay;
    startTime: string;
    endTime: string;
    room: string;
    building: string;
    type: TScheduleType;
    isDeleted: boolean;
};

export type TAcademicCalendarEvent = {
    title: string;
    description?: string;
    date: Date;
    type: TCalendarEventType;
    targetRoles?: string[];
    isDeleted: boolean;
};
