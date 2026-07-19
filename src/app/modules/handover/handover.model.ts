import { Schema, model } from 'mongoose';
import { THandover } from './handover.interface';
import { HandoverShift } from './handover.constant';

const handoverSchema = new Schema<THandover>(
    {
        fromGuard: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        toGuard: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shift: {
            type: String,
            enum: HandoverShift,
            required: true,
        },
        notes: { type: String, required: true, trim: true },
        pendingTasks: [{ type: String, trim: true }],
        handoverTime: { type: Date, required: true },
        acknowledged: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

handoverSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
handoverSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Handover = model<THandover>('Handover', handoverSchema);
