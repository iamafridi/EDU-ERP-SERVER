import { Schema, model } from 'mongoose';
import { TLaundryRequest } from './laundry.interface';
import { LaundryStatus } from './laundry.constant';

const laundrySchema = new Schema<TLaundryRequest>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        pickupDate: { type: Date, required: true },
        deliveryDate: { type: Date },
        items: [{ type: String, trim: true, required: true }],
        status: {
            type: String,
            enum: LaundryStatus,
            default: 'pending',
        },
        totalAmount: { type: Number },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

laundrySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
laundrySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Laundry = model<TLaundryRequest>('Laundry', laundrySchema);
