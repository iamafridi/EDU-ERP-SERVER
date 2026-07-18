import { Schema, model } from 'mongoose';
import { TMaintenance, TMaintenanceComplaint } from './maintenance.interface';
import { ComplaintPriority, ComplaintStatus } from './maintenance.constant';

const nameSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    { _id: false },
);

const maintenanceSchema = new Schema<TMaintenance>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        name: { type: nameSchema, required: true },
        email: { type: String, required: true, trim: true },
        contactNo: { type: String, required: true, trim: true },
        trade: { type: String, trim: true },
        employeeId: { type: String, trim: true },
        profileImg: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

maintenanceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
maintenanceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const complaintSchema = new Schema<TMaintenanceComplaint>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
        priority: { type: String, enum: ComplaintPriority, default: 'medium' },
        status: { type: String, enum: ComplaintStatus, default: 'reported' },
        resolutionNotes: { type: String, trim: true },
        resolvedAt: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

complaintSchema.index({ reportedBy: 1 });

complaintSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
complaintSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Maintenance = model<TMaintenance>('Maintenance', maintenanceSchema);
export const MaintenanceComplaint = model<TMaintenanceComplaint>(
    'MaintenanceComplaint',
    complaintSchema,
);
