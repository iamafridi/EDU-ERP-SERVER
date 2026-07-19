import { Schema, model } from 'mongoose';
import {
    TRoom,
    TRoomStudent,
    TRoomFacilities,
    TRoomAllocation,
} from './room.interface';

const roomFacilitiesSchema = new Schema<TRoomFacilities>(
    {
        facility: {
            type: Schema.Types.ObjectId,
            ref: 'Facility',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);

const roomSchema = new Schema<TRoom>(
    {
        roomNumber: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        building: {
            type: String,
            trim: true,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        monthlyRent: {
            type: Number,
            required: true,
        },
        roomFacilities: [roomFacilitiesSchema],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

roomSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
roomSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Room = model<TRoom>('Room', roomSchema);

const roomStudentSchema = new Schema<TRoomStudent>({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        unique: true,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],
});

export const RoomStudent = model<TRoomStudent>(
    'RoomStudent',
    roomStudentSchema,
);

const roomAllocationSchema = new Schema<TRoomAllocation>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
            unique: true,
        },
        preferredBuilding: { type: String, trim: true },
        preferredFloor: { type: Number },
        requiresAC: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        assignedRoom: { type: Schema.Types.ObjectId, ref: 'Room' },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

roomAllocationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
roomAllocationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const RoomAllocation = model<TRoomAllocation>(
    'RoomAllocation',
    roomAllocationSchema,
);