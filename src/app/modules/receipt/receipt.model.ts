import { Schema, model } from 'mongoose';
import { TReceipt } from './receipt.interface';

const receiptSchema = new Schema<TReceipt>(
    {
        payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
        fee: { type: Schema.Types.ObjectId, ref: 'Fee', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        receiptNumber: { type: String, required: true, unique: true, trim: true },
        amount: { type: Number, required: true },
        generatedAt: { type: Date, default: Date.now },
        qrToken: { type: String, trim: true },
        pdfGenerated: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

receiptSchema.index({ student: 1 });

receiptSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
receiptSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Receipt = model<TReceipt>('Receipt', receiptSchema);
