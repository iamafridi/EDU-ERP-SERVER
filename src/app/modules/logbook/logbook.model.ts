import { Schema, model } from 'mongoose';
import { TClinicalProcedure, TLogEntry } from './logbook.interface';
import { ProcedureCategories, CompetencyLevels } from './logbook.constant';

const clinicalProcedureSchema = new Schema<TClinicalProcedure>(
    {
        code: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, enum: ProcedureCategories, required: true },
        minimumRequired: { type: Number, required: true, default: 1 },
        description: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

clinicalProcedureSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
clinicalProcedureSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const logEntrySchema = new Schema<TLogEntry>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        procedure: { type: Schema.Types.ObjectId, ref: 'ClinicalProcedure', required: true },
        patientAge: { type: Number, required: true },
        patientGender: { type: String, required: true, trim: true },
        diagnosis: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        supervisor: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        supervisorSignOff: { type: Boolean, default: false },
        competency: { type: String, enum: CompetencyLevels, required: true },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

logEntrySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
logEntrySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const ClinicalProcedure = model<TClinicalProcedure>('ClinicalProcedure', clinicalProcedureSchema);
export const LogEntry = model<TLogEntry>('LogEntry', logEntrySchema);
