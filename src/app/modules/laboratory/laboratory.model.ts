import { Schema, model } from 'mongoose';
import { TLabTest, TLabRequest, TLabResult } from './laboratory.interface';
import { TestCategories, RequestStatuses, SampleTypes } from './laboratory.constant';

const labTestSchema = new Schema<TLabTest>(
    {
        code: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, enum: TestCategories, required: true },
        sampleType: { type: String, enum: SampleTypes, required: true },
        normalRange: { type: String, required: true, trim: true },
        unit: { type: String, required: true, trim: true },
        price: { type: Number, required: true, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

labTestSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
labTestSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const labRequestSchema = new Schema<TLabRequest>(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        tests: [{ type: Schema.Types.ObjectId, ref: 'LabTest' }],
        requestDate: { type: Date, required: true },
        status: { type: String, enum: RequestStatuses, default: 'pending' },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

labRequestSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
labRequestSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const labResultSchema = new Schema<TLabResult>(
    {
        requestId: { type: Schema.Types.ObjectId, ref: 'LabRequest', required: true },
        testId: { type: Schema.Types.ObjectId, ref: 'LabTest', required: true },
        resultValue: { type: String, required: true, trim: true, select: false },
        normalRange: { type: String, required: true, trim: true },
        remarks: { type: String, trim: true, select: false },
        technicianId: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        resultDate: { type: Date, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

labResultSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
labResultSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const LabTest = model<TLabTest>('LabTest', labTestSchema);
export const LabRequest = model<TLabRequest>('LabRequest', labRequestSchema);
export const LabResult = model<TLabResult>('LabResult', labResultSchema);
