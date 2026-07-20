import { Schema, model } from 'mongoose';
import { TExpense } from './expense.interface';
import { ExpenseCategories, ExpensePaymentMethods } from './expense.constant';

const expenseSchema = new Schema<TExpense>(
    {
        vendor: { type: String, trim: true },
        category: { type: String, enum: ExpenseCategories, required: true },
        amount: { type: Number, required: true, min: 0 },
        description: { type: String, required: true, trim: true },
        paymentDate: { type: Date, required: true },
        paymentMethod: { type: String, enum: ExpensePaymentMethods, required: true },
        paidTo: { type: String, trim: true },
        receiptAttached: { type: Boolean, default: false },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
        budgetHead: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

expenseSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
expenseSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Expense = model<TExpense>('Expense', expenseSchema);
