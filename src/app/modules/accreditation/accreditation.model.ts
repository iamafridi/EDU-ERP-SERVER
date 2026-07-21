import { Schema, model } from 'mongoose';
import { TAccreditation } from './accreditation.interface';
import { AccreditationBodies, AccreditationTypes } from './accreditation.constant';

const accreditationSchema = new Schema<TAccreditation>(
    {
        name: { type: String, required: true, trim: true },
        body: { type: String, enum: AccreditationBodies, required: true },
        type: { type: String, enum: AccreditationTypes, required: true },
        status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected'], default: 'draft' },
        dueDate: { type: Date, required: true },
        submittedDate: { type: Date },
        data: { type: Schema.Types.Mixed, default: {} },
        attachments: [{ type: String }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

accreditationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
accreditationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Accreditation = model<TAccreditation>('Accreditation', accreditationSchema);
