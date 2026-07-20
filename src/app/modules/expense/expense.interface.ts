import { Types } from 'mongoose';

export type TExpenseCategory = 'salary' | 'maintenance' | 'utilities' | 'supplies' | 'travel' | 'other';
export type TPaymentMethod = 'cash' | 'bank-transfer' | 'cheque' | 'online';

export type TExpense = {
    vendor?: string;
    category: TExpenseCategory;
    amount: number;
    description: string;
    paymentDate: Date;
    paymentMethod: TPaymentMethod;
    paidTo?: string;
    receiptAttached: boolean;
    approvedBy?: Types.ObjectId;
    budgetHead?: string;
    isDeleted: boolean;
};
