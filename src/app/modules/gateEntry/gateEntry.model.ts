import { Schema, model } from 'mongoose';
import { TGateEntry } from './gateEntry.interface';
import { GateEntryType } from './gateEntry.constant';

const gateEntrySchema = new Schema<TGateEntry>(
    {
        type: {
            type: String,
            enum: GateEntryType,
            required: true,
        },
        personName: { type: String, trim: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        vehicleNumber: { type: String, trim: true },
        contactNo: { type: String, trim: true },
        purpose: { type: String, trim: true },
        entryTime: { type: Date, required: true },
        exitTime: { type: Date },
        isLateEntry: { type: Boolean, default: false },
        lateEntryReason: { type: String, trim: true },
        authorizedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        notified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

gateEntrySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
gateEntrySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const GateEntry = model<TGateEntry>('GateEntry', gateEntrySchema);
