import { Schema, model } from 'mongoose';
import { TShift } from './shift.interface';
import { ShiftTypes, ShiftStatuses } from './shift.constant';

const shiftSchema = new Schema<TShift>(
    {
        employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
        shiftDate: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        location: { type: String, trim: true },
        shiftType: { type: String, enum: ShiftTypes, required: true },
        status: { type: String, enum: ShiftStatuses, default: 'scheduled' },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

shiftSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
shiftSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Shift = model<TShift>('Shift', shiftSchema);
