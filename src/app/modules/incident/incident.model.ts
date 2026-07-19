import { Schema, model } from 'mongoose';
import { TIncident } from './incident.interface';
import { IncidentSeverity, IncidentStatus } from './incident.constant';

const incidentSchema = new Schema<TIncident>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        severity: {
            type: String,
            enum: IncidentSeverity,
            required: true,
        },
        status: {
            type: String,
            enum: IncidentStatus,
            default: 'reported',
        },
        location: { type: String, required: true, trim: true },
        reportedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
        photos: [{ type: String }],
        resolution: { type: String, trim: true },
        resolvedAt: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

incidentSchema.index({ reportedBy: 1 });

incidentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
incidentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Incident = model<TIncident>('Incident', incidentSchema);
