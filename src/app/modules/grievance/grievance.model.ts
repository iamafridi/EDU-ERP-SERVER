import { Schema, model } from 'mongoose';
import { TGrievance } from './grievance.interface';
import { GrievanceCategories, GrievanceStatuses } from './grievance.constant';

const grievanceSchema = new Schema<TGrievance>(
    {
        complainant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isAnonymous: { type: Boolean, default: false },
        subject: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: { type: String, enum: GrievanceCategories, required: true },
        status: { type: String, enum: GrievanceStatuses, default: 'submitted' },
        assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
        resolution: { type: String, trim: true },
        resolvedAt: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

grievanceSchema.index({ complainant: 1 });

grievanceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
grievanceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Grievance = model<TGrievance>('Grievance', grievanceSchema);
