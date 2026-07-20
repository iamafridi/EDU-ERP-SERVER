import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ExpenseSearchableFields } from './expense.constant';
import { TExpense } from './expense.interface';
import { Expense } from './expense.model';

const createExpenseIntoDB = async (payload: TExpense) => {
    const result = await Expense.create(payload);
    return result;
};

const getAllExpensesFromDB = async (query: Record<string, unknown>) => {
    const expenseQuery = new QueryBuilder(
        Expense.find().populate('approvedBy'),
        query,
    )
        .search(ExpenseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await expenseQuery.modelQuery;
    const meta = await expenseQuery.countTotal();
    return { data, meta };
};

const getSingleExpenseFromDB = async (id: string) => {
    const result = await Expense.findById(id).populate('approvedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Expense not found');
    return result;
};

const updateExpenseIntoDB = async (id: string, payload: Partial<TExpense>) => {
    const result = await Expense.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Expense not found');
    return result;
};

const deleteExpenseFromDB = async (id: string) => {
    const result = await Expense.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Expense not found');
    return result;
};

const getExpenseSummaryFromDB = async () => {
    const summary = await Expense.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: '$category',
                total: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
        { $sort: { total: -1 } },
    ]);
    return summary;
};

export const ExpenseServices = {
    createExpenseIntoDB,
    getAllExpensesFromDB,
    getSingleExpenseFromDB,
    updateExpenseIntoDB,
    deleteExpenseFromDB,
    getExpenseSummaryFromDB,
};
