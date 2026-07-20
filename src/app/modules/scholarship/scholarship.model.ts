import { Schema, model } from 'mongoose';
import { TScholarship } from './scholarship.interface';
import { ScholarshipTypes, ScholarshipStatuses } from './scholarship.constant';

const scholarshipSchema = new Schema<TScholarship>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ScholarshipTypes, required: true },
        amount: { type: Number, required: true, min: 0 },
        isPercentage: { type: Boolean, default: false },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
        status: { type: String, enum: ScholarshipStatuses, default: 'pending' },
        documents: [{ type: String }],
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

scholarshipSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
scholarshipSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Scholarship = model<TScholarship>('Scholarship', scholarshipSchema);
