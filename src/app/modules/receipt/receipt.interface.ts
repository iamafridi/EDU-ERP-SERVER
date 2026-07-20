import { Types } from 'mongoose';

export type TReceipt = {
    payment: Types.ObjectId;
    fee: Types.ObjectId;
    student: Types.ObjectId;
    receiptNumber: string;
    amount: number;
    generatedAt: Date;
    qrToken?: string;
    pdfGenerated: boolean;
    isDeleted: boolean;
};
