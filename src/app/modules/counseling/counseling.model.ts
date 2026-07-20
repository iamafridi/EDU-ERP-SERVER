import { Schema, model } from 'mongoose';
import { TCounseling } from './counseling.interface';
import { CounselingTypes, CounselingModes, CounselingStatuses } from './counseling.constant';

const counselingSchema = new Schema<TCounseling>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        counselor: { type: Schema.Types.ObjectId, ref: 'Counselor', required: true },
        sessionDate: { type: Date, required: true },
        type: { type: String, enum: CounselingTypes, required: true },
        mode: { type: String, enum: CounselingModes, required: true },
        status: { type: String, enum: CounselingStatuses, default: 'scheduled' },
        privateNotes: { type: String, trim: true, select: false },
        checkIn: { type: String, trim: true, select: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

counselingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
counselingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Counseling = model<TCounseling>('Counseling', counselingSchema);
