import { Schema, model } from 'mongoose';
import { TPayroll, TAllowances, TDeductions } from './payroll.interface';
import { PayrollStatuses } from './payroll.constant';

const allowancesSchema = new Schema<TAllowances>(
    {
        hra: { type: Number, default: 0 },
        da: { type: Number, default: 0 },
        travel: { type: Number, default: 0 },
        medical: { type: Number, default: 0 },
        special: { type: Number, default: 0 },
    },
    { _id: false },
);

const deductionsSchema = new Schema<TDeductions>(
    {
        tax: { type: Number, default: 0 },
        providentFund: { type: Number, default: 0 },
        insurance: { type: Number, default: 0 },
        loan: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
    },
    { _id: false },
);

const payrollSchema = new Schema<TPayroll>(
    {
        employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
        month: { type: Number, required: true, min: 1, max: 12 },
        year: { type: Number, required: true },
        basicSalary: { type: Number, required: true, min: 0, select: false },
        allowances: { type: allowancesSchema, select: false, default: () => ({}) },
        deductions: { type: deductionsSchema, select: false, default: () => ({}) },
        grossPay: { type: Number, required: true, min: 0, select: false },
        totalDeductions: { type: Number, required: true, min: 0 },
        netPay: { type: Number, required: true, min: 0, select: false },
        paymentDate: { type: Date },
        status: { type: String, enum: PayrollStatuses, default: 'pending' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

payrollSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

payrollSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
payrollSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Payroll = model<TPayroll>('Payroll', payrollSchema);
