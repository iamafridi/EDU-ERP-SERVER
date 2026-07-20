import { Types } from 'mongoose';

export type TBudgetCategory = 'salary' | 'infrastructure' | 'equipment' | 'research' | 'scholarship' | 'travel' | 'supplies' | 'maintenance' | 'other';
export type TBudgetStatus = 'active' | 'closed' | 'cancelled';

export type TBudget = {
    budgetHead: string;
    category: TBudgetCategory;
    allocatedAmount: number;
    spentAmount: number;
    fiscalYear: string;
    department?: string;
    status: TBudgetStatus;
    description?: string;
    createdBy?: Types.ObjectId;
    isDeleted: boolean;
};
