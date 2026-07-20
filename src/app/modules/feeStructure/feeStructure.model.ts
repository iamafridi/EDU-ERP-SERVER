import { Schema, model } from 'mongoose';
import { TFeeStructure } from './feeStructure.interface';
import { FeeCategories } from './feeStructure.constant';

const feeStructureSchema = new Schema<TFeeStructure>(
    {
        name: { type: String, required: true, trim: true },
        amount: { type: Number, required: true, min: 0 },
        category: { type: String, enum: FeeCategories, required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        applicableTo: [{ type: String }],
        isOptional: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

feeStructureSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
feeStructureSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const FeeStructure = model<TFeeStructure>('FeeStructure', feeStructureSchema);
