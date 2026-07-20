import { Schema, model } from 'mongoose';
import { TFee, TFeeHeadEntry } from './fee.interface';
import { FeeStatus } from './fee.constant';

const feeHeadEntrySchema = new Schema<TFeeHeadEntry>(
    {
        head: { type: Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
        amount: { type: Number, required: true },
    },
    { _id: false },
);

const feeSchema = new Schema<TFee>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        totalAmount: { type: Number, required: true },
        paidAmount: { type: Number, default: 0 },
        dueAmount: { type: Number, required: true },
        lateFee: { type: Number, default: 0 },
        dueDate: { type: Date, required: true },
        status: { type: String, enum: FeeStatus, default: 'unpaid' },
        feeHeads: [feeHeadEntrySchema],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

feeSchema.index({ student: 1, academicSemester: 1 }, { unique: true });

feeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
feeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Fee = model<TFee>('Fee', feeSchema);
