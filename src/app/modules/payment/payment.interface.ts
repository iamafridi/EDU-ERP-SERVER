import { Types } from 'mongoose';

export type TPaymentMethod = 'online' | 'offline' | 'bank-transfer' | 'cash';
export type TPaymentStatus = 'success' | 'failed' | 'refunded';

export type TPayment = {
    fee: Types.ObjectId;
    student: Types.ObjectId;
    amount: number;
    method: TPaymentMethod;
    transactionId?: string;
    paymentDate: Date;
    status: TPaymentStatus;
    isDeleted: boolean;
};
