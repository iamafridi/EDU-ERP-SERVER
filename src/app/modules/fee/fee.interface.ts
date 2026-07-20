import { Types } from 'mongoose';

export type TFeeStatus = 'unpaid' | 'partial' | 'paid';

export type TFeeHeadEntry = {
    head: Types.ObjectId;
    amount: number;
};

export type TFee = {
    student: Types.ObjectId;
    academicSemester: Types.ObjectId;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    lateFee: number;
    dueDate: Date;
    status: TFeeStatus;
    feeHeads: TFeeHeadEntry[];
    isDeleted: boolean;
};
