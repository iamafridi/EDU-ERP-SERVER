import { Schema, model } from 'mongoose';
import { TResearch } from './research.interface';
import { ResearchTypes, ResearchStatuses } from './research.constant';

const researchSchema = new Schema<TResearch>(
    {
        title: { type: String, required: true, trim: true },
        authors: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
        type: { type: String, enum: ResearchTypes, required: true },
        status: { type: String, enum: ResearchStatuses, default: 'submitted' },
        abstract: { type: String, trim: true },
        journal: { type: String, trim: true },
        doi: { type: String, trim: true },
        grantAmount: { type: Number, min: 0 },
        startDate: { type: Date },
        endDate: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

researchSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
researchSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Research = model<TResearch>('Research', researchSchema);
