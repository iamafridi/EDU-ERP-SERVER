import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';
import { PaymentMethods, PaymentStatuses } from './payment.constant';

const paymentSchema = new Schema<TPayment>(
    {
        fee: { type: Schema.Types.ObjectId, ref: 'Fee', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        amount: { type: Number, required: true, min: 0 },
        method: { type: String, enum: PaymentMethods, required: true },
        transactionId: { type: String, trim: true, select: false },
        paymentDate: { type: Date, required: true },
        status: { type: String, enum: PaymentStatuses, default: 'success' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

paymentSchema.index({ student: 1 });

paymentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
paymentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Payment = model<TPayment>('Payment', paymentSchema);
