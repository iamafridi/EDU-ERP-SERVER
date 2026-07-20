import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BudgetSearchableFields } from './budget.constant';
import { TBudget } from './budget.interface';
import { Budget } from './budget.model';

const createBudgetIntoDB = async (payload: TBudget) => {
    const result = await Budget.create(payload);
    return result;
};

const getAllBudgetsFromDB = async (query: Record<string, unknown>) => {
    const budgetQuery = new QueryBuilder(
        Budget.find().populate('createdBy'),
        query,
    )
        .search(BudgetSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await budgetQuery.modelQuery;
    const meta = await budgetQuery.countTotal();
    return { data, meta };
};

const getSingleBudgetFromDB = async (id: string) => {
    const result = await Budget.findById(id).populate('createdBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Budget not found');
    return result;
};

const updateBudgetIntoDB = async (id: string, payload: Partial<TBudget>) => {
    const result = await Budget.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Budget not found');
    return result;
};

const deleteBudgetFromDB = async (id: string) => {
    const result = await Budget.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Budget not found');
    return result;
};

const getBudgetSummaryFromDB = async () => {
    const summary = await Budget.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: '$category',
                totalAllocated: { $sum: '$allocatedAmount' },
                totalSpent: { $sum: '$spentAmount' },
                count: { $sum: 1 },
            },
        },
        { $sort: { totalAllocated: -1 } },
    ]);
    const totals = await Budget.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: null,
                totalAllocated: { $sum: '$allocatedAmount' },
                totalSpent: { $sum: '$spentAmount' },
                count: { $sum: 1 },
            },
        },
    ]);
    return { summary, totals: totals[0] || { totalAllocated: 0, totalSpent: 0, count: 0 } };
};

export const BudgetServices = {
    createBudgetIntoDB,
    getAllBudgetsFromDB,
    getSingleBudgetFromDB,
    updateBudgetIntoDB,
    deleteBudgetFromDB,
    getBudgetSummaryFromDB,
};
