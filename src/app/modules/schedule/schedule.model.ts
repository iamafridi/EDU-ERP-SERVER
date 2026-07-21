import { Schema, model } from 'mongoose';
import { TSchedule, TAcademicCalendarEvent } from './schedule.interface';
import { ScheduleDays, ScheduleTypes, CalendarEventTypes } from './schedule.constant';

const scheduleSchema = new Schema<TSchedule>(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true,
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        day: { type: String, enum: ScheduleDays, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        room: { type: String, required: true, trim: true },
        building: { type: String, required: true, trim: true },
        type: { type: String, enum: ScheduleTypes, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

scheduleSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
scheduleSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const calendarEventSchema = new Schema<TAcademicCalendarEvent>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        date: { type: Date, required: true },
        type: { type: String, enum: CalendarEventTypes, required: true },
        targetRoles: [{ type: String }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

calendarEventSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
calendarEventSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Schedule = model<TSchedule>('Schedule', scheduleSchema);
export const AcademicCalendarEvent = model<TAcademicCalendarEvent>(
    'AcademicCalendarEvent',
    calendarEventSchema,
);
