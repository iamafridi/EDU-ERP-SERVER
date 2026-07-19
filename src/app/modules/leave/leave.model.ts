import { Schema, model } from 'mongoose';
import { TLeave } from './leave.interface';
import { LeaveTypes, LeaveStatuses } from './leave.constant';

const leaveSchema = new Schema<TLeave>(
    {
        employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
        leaveType: { type: String, enum: LeaveTypes, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        totalDays: { type: Number, required: true, min: 1 },
        reason: { type: String, required: true, trim: true },
        status: { type: String, enum: LeaveStatuses, default: 'pending' },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

leaveSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
leaveSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Leave = model<TLeave>('Leave', leaveSchema);
