import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { MessServices } from './mess.service';

const createMenu = catchAsync(async (req, res) => {
    const result = await MessServices.createMenuIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Menu created successfully',
        data: result,
    });
});

const getAllMenus = catchAsync(async (req, res) => {
    const { data, meta } = await MessServices.getAllMenusFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Menus retrieved successfully',
        meta,
        data,
    });
});

const getSingleMenu = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessServices.getSingleMenuFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Menu retrieved successfully',
        data: result,
    });
});

const updateMenu = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessServices.updateMenuIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Menu updated successfully',
        data: result,
    });
});

const deleteMenu = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessServices.deleteMenuFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Menu deleted successfully',
        data: result,
    });
});

const createMealPlan = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await MessServices.createMealPlanIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Meal plan created successfully',
        data: result,
    });
});

const getAllMealPlans = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'meal-plan');
    const { data, meta } = await MessServices.getAllMealPlansFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meal plans retrieved successfully',
        meta,
        data,
    });
});

const getSingleMealPlan = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessServices.getSingleMealPlanFromDB(id);
    assertOwnership(req, result, 'meal-plan');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meal plan retrieved successfully',
        data: result,
    });
});

const updateMealPlan = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await MessServices.getSingleMealPlanFromDB(id);
    assertOwnership(req, record, 'meal-plan');
    const result = await MessServices.updateMealPlanIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meal plan updated successfully',
        data: result,
    });
});

const createFeedback = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await MessServices.createFeedbackIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Feedback submitted successfully',
        data: result,
    });
});

const getAllFeedbacks = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'meal-feedback');
    const { data, meta } = await MessServices.getAllFeedbacksFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedbacks retrieved successfully',
        meta,
        data,
    });
});

const createBill = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await MessServices.createBillIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Mess bill created successfully',
        data: result,
    });
});

const getAllBills = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'mess-bill');
    const { data, meta } = await MessServices.getAllBillsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Mess bills retrieved successfully',
        meta,
        data,
    });
});

const getSingleBill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessServices.getSingleBillFromDB(id);
    assertOwnership(req, result, 'mess-bill');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Mess bill retrieved successfully',
        data: result,
    });
});

const updateBill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await MessServices.getSingleBillFromDB(id);
    assertOwnership(req, record, 'mess-bill');
    const result = await MessServices.updateBillIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Mess bill updated successfully',
        data: result,
    });
});

export const MessControllers = {
    createMenu,
    getAllMenus,
    getSingleMenu,
    updateMenu,
    deleteMenu,
    createMealPlan,
    getAllMealPlans,
    getSingleMealPlan,
    updateMealPlan,
    createFeedback,
    getAllFeedbacks,
    createBill,
    getAllBills,
    getSingleBill,
    updateBill,
};
