import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Fee } from '../fee/fee.model';
import {
    TMealMenu,
    TMealPlan,
    TMealFeedback,
    TMessBill,
} from './mess.interface';
import { MealMenu, MealPlan, MealFeedback, MessBill } from './mess.model';

const createMenuIntoDB = async (payload: TMealMenu) => {
    const result = await MealMenu.create(payload);
    return result;
};

const getAllMenusFromDB = async (query: Record<string, unknown>) => {
    const menuQuery = new QueryBuilder(MealMenu.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await menuQuery.modelQuery;
    const meta = await menuQuery.countTotal();
    return { data, meta };
};

const getSingleMenuFromDB = async (id: string) => {
    const result = await MealMenu.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Menu not found');
    return result;
};

const updateMenuIntoDB = async (id: string, payload: Partial<TMealMenu>) => {
    const result = await MealMenu.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Menu not found');
    return result;
};

const deleteMenuFromDB = async (id: string) => {
    const result = await MealMenu.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Menu not found');
    return result;
};

const createMealPlanIntoDB = async (payload: TMealPlan) => {
    const existing = await MealPlan.findOne({ student: payload.student });
    if (existing) {
        await MealPlan.findByIdAndUpdate(existing._id, { isActive: false });
    }
    const result = await MealPlan.create(payload);
    return result;
};

const getAllMealPlansFromDB = async (query: Record<string, unknown>) => {
    const planQuery = new QueryBuilder(
        MealPlan.find().populate('student'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await planQuery.modelQuery;
    const meta = await planQuery.countTotal();
    return { data, meta };
};

const getSingleMealPlanFromDB = async (id: string) => {
    const result = await MealPlan.findById(id).populate('student');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Meal plan not found');
    return result;
};

const updateMealPlanIntoDB = async (
    id: string,
    payload: Partial<TMealPlan>,
) => {
    const result = await MealPlan.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Meal plan not found');
    return result;
};

const createFeedbackIntoDB = async (payload: TMealFeedback) => {
    const result = await MealFeedback.create(payload);
    return result;
};

const getAllFeedbacksFromDB = async (query: Record<string, unknown>) => {
    const feedbackQuery = new QueryBuilder(
        MealFeedback.find().populate('student menu'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await feedbackQuery.modelQuery;
    const meta = await feedbackQuery.countTotal();
    return { data, meta };
};

const createBillIntoDB = async (payload: TMessBill) => {
    payload.totalAmount = payload.totalMeals * payload.ratePerMeal;
    const result = await MessBill.create(payload);

    // Also create a fee record for the mess bill
    const dueDate = payload.dueDate || new Date(new Date().setMonth(new Date().getMonth() + 1));
    try {
        await Fee.create({
            student: payload.student,
            totalAmount: payload.totalAmount,
            paidAmount: 0,
            dueAmount: payload.totalAmount,
            dueDate,
            status: 'unpaid',
            feeHeads: [],
        });
    } catch {
        // Fee may already exist for this period; silently continue
    }

    return result;
};

const getAllBillsFromDB = async (query: Record<string, unknown>) => {
    const billQuery = new QueryBuilder(
        MessBill.find().populate('student'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await billQuery.modelQuery;
    const meta = await billQuery.countTotal();
    return { data, meta };
};

const getSingleBillFromDB = async (id: string) => {
    const result = await MessBill.findById(id).populate('student');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Bill not found');
    return result;
};

const updateBillIntoDB = async (id: string, payload: Partial<TMessBill>) => {
    const result = await MessBill.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Bill not found');
    return result;
};

export const MessServices = {
    createMenuIntoDB,
    getAllMenusFromDB,
    getSingleMenuFromDB,
    updateMenuIntoDB,
    deleteMenuFromDB,
    createMealPlanIntoDB,
    getAllMealPlansFromDB,
    getSingleMealPlanFromDB,
    updateMealPlanIntoDB,
    createFeedbackIntoDB,
    getAllFeedbacksFromDB,
    createBillIntoDB,
    getAllBillsFromDB,
    getSingleBillFromDB,
    updateBillIntoDB,
};
