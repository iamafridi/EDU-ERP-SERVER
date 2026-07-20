import { Types } from 'mongoose';

export type TPayrollStatus = 'pending' | 'paid' | 'cancelled';

export type TAllowances = {
    hra: number;
    da: number;
    travel: number;
    medical: number;
    special: number;
};

export type TDeductions = {
    tax: number;
    providentFund: number;
    insurance: number;
    loan: number;
    other: number;
};

export type TPayroll = {
    employee: Types.ObjectId;
    month: number;
    year: number;
    basicSalary: number;
    allowances: TAllowances;
    deductions: TDeductions;
    grossPay: number;
    totalDeductions: number;
    netPay: number;
    paymentDate?: Date;
    status: TPayrollStatus;
    isDeleted: boolean;
};
