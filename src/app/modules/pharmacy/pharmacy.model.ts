import { Schema, model } from 'mongoose';
import { TDrug, TPrescription, TDispensing } from './pharmacy.interface';
import { DrugCategories } from './pharmacy.constant';

const drugSchema = new Schema<TDrug>(
    {
        code: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, enum: DrugCategories, required: true },
        manufacturer: { type: String, required: true, trim: true },
        unit: { type: String, required: true, trim: true },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 0 },
        reorderLevel: { type: Number, required: true, default: 10 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

drugSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
drugSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const prescriptionSchema = new Schema<TPrescription>(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        drugs: [
            {
                drugId: { type: Schema.Types.ObjectId, ref: 'Drug', required: true },
                dosage: { type: String, required: true },
                duration: { type: String, required: true },
                instructions: { type: String, select: false },
            },
        ],
        date: { type: Date, required: true },
        notes: { type: String, trim: true, select: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

prescriptionSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
prescriptionSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const dispensingSchema = new Schema<TDispensing>(
    {
        prescriptionId: { type: Schema.Types.ObjectId, ref: 'Prescription', required: true },
        pharmacistId: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        dispensedDate: { type: Date, required: true },
        notes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

dispensingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
dispensingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Drug = model<TDrug>('Drug', drugSchema);
export const Prescription = model<TPrescription>('Prescription', prescriptionSchema);
export const Dispensing = model<TDispensing>('Dispensing', dispensingSchema);
