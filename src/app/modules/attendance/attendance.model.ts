import { Schema, model } from 'mongoose';
import { TAttendance } from './attendance.interface';
import { AttendanceStatus } from './attendance.constant';

const attendanceSchema = new Schema<TAttendance>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        date: { type: Date, required: true },
        status: { type: String, enum: AttendanceStatus, required: true },
        period: { type: Number },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

attendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

attendanceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
attendanceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Attendance = model<TAttendance>('Attendance', attendanceSchema);
