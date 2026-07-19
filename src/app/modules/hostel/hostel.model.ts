import { Schema, model } from 'mongoose';
import { THostelCheckIn, TInspectionItem } from './hostel.interface';
import { HostelStatus } from './hostel.constant';

const inspectionItemSchema = new Schema<TInspectionItem>(
    {
        item: { type: String, required: true, trim: true },
        condition: { type: String, required: true, trim: true },
        notes: { type: String, trim: true },
    },
    { _id: false },
);

const hostelSchema = new Schema<THostelCheckIn>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
            unique: true,
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date },
        depositAmount: { type: Number, default: 0 },
        depositPaid: { type: Boolean, default: false },
        depositRefunded: { type: Boolean, default: false },
        inspectionChecklist: [inspectionItemSchema],
        status: {
            type: String,
            enum: HostelStatus,
            default: 'checked-in',
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

hostelSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
hostelSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Hostel = model<THostelCheckIn>('Hostel', hostelSchema);
