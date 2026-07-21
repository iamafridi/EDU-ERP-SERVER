import { Schema, model } from 'mongoose';
import { TClinicalRotation } from './clinicalRotation.interface';
import { RotationStatuses } from './clinicalRotation.constant';

const clinicalRotationSchema = new Schema<TClinicalRotation>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        department: { type: String, required: true, trim: true },
        faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        totalHours: { type: Number, required: true, min: 0 },
        loggedHours: { type: Number, default: 0, min: 0 },
        status: { type: String, enum: RotationStatuses, default: 'scheduled' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

clinicalRotationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
clinicalRotationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const ClinicalRotation = model<TClinicalRotation>('ClinicalRotation', clinicalRotationSchema);
