import { Schema, model } from 'mongoose';
import { THealthCenter } from './healthCenter.interface';

const healthCenterSchema = new Schema<THealthCenter>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        visitDate: { type: Date, required: true },
        symptoms: [{ type: String, trim: true }],
        diagnosis: { type: String, trim: true, select: false },
        prescription: { type: String, trim: true, select: false },
        doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        followUpDate: { type: Date },
        medicalLeaveDays: { type: Number, min: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

healthCenterSchema.index({ student: 1 });

healthCenterSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
healthCenterSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const HealthCenter = model<THealthCenter>('HealthCenter', healthCenterSchema);
