import { Schema, model } from 'mongoose';
import { TPatrolLog } from './patrolLog.interface';
import { PatrolStatus } from './patrolLog.constant';

const patrolLogSchema = new Schema<TPatrolLog>(
    {
        guard: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        checkpoint: { type: String, required: true, trim: true },
        scanTime: { type: Date, required: true },
        status: {
            type: String,
            enum: PatrolStatus,
            required: true,
        },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

patrolLogSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
patrolLogSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const PatrolLog = model<TPatrolLog>('PatrolLog', patrolLogSchema);
