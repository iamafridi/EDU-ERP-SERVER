import { Schema, model } from 'mongoose';
import { TExam } from './exam.interface';
import { ExamTypes } from './exam.constant';

const examSchema = new Schema<TExam>(
    {
        title: { type: String, required: true, trim: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        type: { type: String, enum: ExamTypes, required: true },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        totalMarks: { type: Number, required: true },
        hallTicketGenerated: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

examSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
examSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Exam = model<TExam>('Exam', examSchema);
