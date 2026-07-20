import { Schema, model } from 'mongoose';
import { TReport } from './report.interface';
import { ReportFormats, ReportStatuses } from './report.constant';

const reportSchema = new Schema<TReport>(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ReportFormats, required: true },
        status: { type: String, enum: ReportStatuses, default: 'generating' },
        query: { type: Schema.Types.Mixed, default: {} },
        generatedBy: { type: String, required: true },
        fileUrl: { type: String },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

reportSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
reportSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Report = model<TReport>('Report', reportSchema);
