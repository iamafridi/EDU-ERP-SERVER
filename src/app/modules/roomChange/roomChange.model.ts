import { Schema, model } from 'mongoose';
import { TRoomChangeRequest } from './roomChange.interface';
import { RoomChangeStatus } from './roomChange.constant';

const roomChangeSchema = new Schema<TRoomChangeRequest>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        currentRoom: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        requestedRoom: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        reason: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: RoomChangeStatus,
            default: 'pending',
        },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        approvalDate: { type: Date },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

roomChangeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
roomChangeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const RoomChange = model<TRoomChangeRequest>(
    'RoomChange',
    roomChangeSchema,
);
