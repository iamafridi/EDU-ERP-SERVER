import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BudgetServices } from './budget.service';

const createBudget = catchAsync(async (req, res) => {
    const result = await BudgetServices.createBudgetIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Budget created successfully',
        data: result,
    });
});

const getAllBudgets = catchAsync(async (req, res) => {
    const { data, meta } = await BudgetServices.getAllBudgetsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Budgets retrieved successfully',
        meta,
        data,
    });
});

const getSingleBudget = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BudgetServices.getSingleBudgetFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Budget retrieved successfully',
        data: result,
    });
});

const updateBudget = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BudgetServices.updateBudgetIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Budget updated successfully',
        data: result,
    });
});

const deleteBudget = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BudgetServices.deleteBudgetFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Budget deleted successfully',
        data: result,
    });
});

const getBudgetSummary = catchAsync(async (req, res) => {
    const result = await BudgetServices.getBudgetSummaryFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Budget summary retrieved successfully',
        data: result,
    });
});

export const BudgetControllers = {
    createBudget,
    getAllBudgets,
    getSingleBudget,
    updateBudget,
    deleteBudget,
    getBudgetSummary,
};
