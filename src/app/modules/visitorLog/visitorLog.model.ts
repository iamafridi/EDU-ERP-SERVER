import { Schema, model } from 'mongoose';
import { TVisitorLog } from './visitorLog.interface';

const visitorLogSchema = new Schema<TVisitorLog>(
    {
        visitorName: { type: String, required: true, trim: true },
        contactNo: { type: String, required: true, trim: true },
        email: { type: String, trim: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        purpose: { type: String, required: true, trim: true },
        preApproved: { type: Boolean, default: false },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        qrToken: { type: String, trim: true },
        entryTime: { type: Date },
        exitTime: { type: Date },
        vehicleNumber: { type: String, trim: true },
        idProof: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

visitorLogSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
visitorLogSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const VisitorLog = model<TVisitorLog>('VisitorLog', visitorLogSchema);
