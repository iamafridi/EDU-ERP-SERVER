import { Schema, model } from 'mongoose';
import { TTimetable, TTimetableEntry } from './timetable.interface';
import { TimetableDays, TimetableEntryTypes } from './timetable.constant';

const timetableEntrySchema = new Schema<TTimetableEntry>(
    {
        day: { type: String, enum: TimetableDays, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        room: { type: String, required: true, trim: true },
        type: { type: String, enum: TimetableEntryTypes, required: true },
    },
    { _id: true },
);

const timetableSchema = new Schema<TTimetable>(
    {
        academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester', required: true },
        department: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
        year: { type: Number, required: true },
        section: { type: String, required: true, trim: true },
        entries: [timetableEntrySchema],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

timetableSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
timetableSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Timetable = model<TTimetable>('Timetable', timetableSchema);
