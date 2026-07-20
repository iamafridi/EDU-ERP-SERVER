import { Schema, model } from 'mongoose';
import { TBudget } from './budget.interface';
import { BudgetCategories, BudgetStatuses } from './budget.constant';

const budgetSchema = new Schema<TBudget>(
    {
        budgetHead: { type: String, required: true, trim: true },
        category: { type: String, enum: BudgetCategories, required: true },
        allocatedAmount: { type: Number, required: true, min: 0 },
        spentAmount: { type: Number, required: true, min: 0, default: 0 },
        fiscalYear: { type: String, required: true, trim: true },
        department: { type: String, trim: true },
        status: { type: String, enum: BudgetStatuses, default: 'active' },
        description: { type: String, trim: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

budgetSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
budgetSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Budget = model<TBudget>('Budget', budgetSchema);
