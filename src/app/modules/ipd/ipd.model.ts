import { Schema, model } from 'mongoose';
import { TIPDAdmission, TIPDDischarge } from './ipd.interface';
import { AdmissionStatuses, WardTypes, DischargeTypes } from './ipd.constant';

const ipdAdmissionSchema = new Schema<TIPDAdmission>(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        ward: { type: String, enum: WardTypes, required: true },
        bedNumber: { type: String, required: true, trim: true },
        admissionDate: { type: Date, required: true },
        diagnosis: { type: String, required: true, trim: true, select: false },
        status: { type: String, enum: AdmissionStatuses, default: 'admitted' },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

ipdAdmissionSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ipdAdmissionSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const ipdDischargeSchema = new Schema<TIPDDischarge>(
    {
        admissionId: { type: Schema.Types.ObjectId, ref: 'IPDAdmission', required: true },
        dischargeDate: { type: Date, required: true },
        dischargeType: { type: String, enum: DischargeTypes, required: true },
        dischargeSummary: { type: String, required: true, trim: true, select: false },
        followUpInstructions: { type: String, trim: true, select: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

ipdDischargeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ipdDischargeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const IPDAdmission = model<TIPDAdmission>('IPDAdmission', ipdAdmissionSchema);
export const IPDDischarge = model<TIPDDischarge>('IPDDischarge', ipdDischargeSchema);
