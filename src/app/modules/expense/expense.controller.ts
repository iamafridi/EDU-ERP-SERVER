import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExpenseServices } from './expense.service';

const createExpense = catchAsync(async (req, res) => {
    const result = await ExpenseServices.createExpenseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Expense created successfully',
        data: result,
    });
});

const getAllExpenses = catchAsync(async (req, res) => {
    const { data, meta } = await ExpenseServices.getAllExpensesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Expenses retrieved successfully',
        meta,
        data,
    });
});

const getSingleExpense = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExpenseServices.getSingleExpenseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Expense retrieved successfully',
        data: result,
    });
});

const updateExpense = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExpenseServices.updateExpenseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Expense updated successfully',
        data: result,
    });
});

const deleteExpense = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExpenseServices.deleteExpenseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Expense deleted successfully',
        data: result,
    });
});

const getExpenseSummary = catchAsync(async (req, res) => {
    const result = await ExpenseServices.getExpenseSummaryFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Expense summary retrieved successfully',
        data: result,
    });
});

export const ExpenseControllers = {
    createExpense,
    getAllExpenses,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
};
