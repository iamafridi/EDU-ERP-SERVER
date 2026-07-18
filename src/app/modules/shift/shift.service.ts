import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TShift } from './shift.interface';
import { Shift } from './shift.model';

const createShiftIntoDB = async (payload: TShift) => {
    const result = await Shift.create(payload);
    return result;
};

const getAllShiftsFromDB = async (query: Record<string, unknown>) => {
    const shiftQuery = new QueryBuilder(
        Shift.find().populate('employee'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await shiftQuery.modelQuery;
    const meta = await shiftQuery.countTotal();
    return { data, meta };
};

const getSingleShiftFromDB = async (id: string) => {
    const result = await Shift.findById(id).populate('employee');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Shift not found');
    return result;
};

const updateShiftIntoDB = async (id: string, payload: Partial<TShift>) => {
    const result = await Shift.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Shift not found');
    return result;
};

const deleteShiftFromDB = async (id: string) => {
    const result = await Shift.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Shift not found');
    return result;
};

const getShiftsByEmployeeFromDB = async (employeeId: string, query: Record<string, unknown>) => {
    const shiftQuery = new QueryBuilder(
        Shift.find({ employee: employeeId }).populate('employee'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await shiftQuery.modelQuery;
    const meta = await shiftQuery.countTotal();
    return { data, meta };
};

export const ShiftServices = {
    createShiftIntoDB,
    getAllShiftsFromDB,
    getSingleShiftFromDB,
    updateShiftIntoDB,
    deleteShiftFromDB,
    getShiftsByEmployeeFromDB,
};
