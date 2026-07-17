import { Schema, model } from 'mongoose';
import { TGrade } from './grade.interface';

const gradeSchema = new Schema<TGrade>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        marksObtained: { type: Number, required: true },
        totalMarks: { type: Number, required: true },
        grade: { type: String },
        gradePoint: { type: Number },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

gradeSchema.index({ student: 1, course: 1, exam: 1 }, { unique: true });

gradeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
gradeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Grade = model<TGrade>('Grade', gradeSchema);
