import { Schema, model } from 'mongoose';
import { TPatientEncounter } from './patientEncounter.interface';
import { PatientGenders } from './patientEncounter.constant';

const patientEncounterSchema = new Schema<TPatientEncounter>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        patientName: { type: String, required: true, trim: true },
        patientAge: { type: Number, required: true, min: 0 },
        patientGender: { type: String, enum: PatientGenders, required: true },
        diagnosis: { type: String, required: true, trim: true },
        procedures: [{ type: String, trim: true }],
        date: { type: Date, required: true },
        supervisedBy: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        department: { type: String, required: true, trim: true },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

patientEncounterSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
patientEncounterSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const PatientEncounter = model<TPatientEncounter>('PatientEncounter', patientEncounterSchema);
