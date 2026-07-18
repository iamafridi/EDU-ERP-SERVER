import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShiftServices } from './shift.service';

const createShift = catchAsync(async (req, res) => {
    const result = await ShiftServices.createShiftIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Shift created successfully',
        data: result,
    });
});

const getAllShifts = catchAsync(async (req, res) => {
    const { data, meta } = await ShiftServices.getAllShiftsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Shifts retrieved successfully',
        meta,
        data,
    });
});

const getSingleShift = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ShiftServices.getSingleShiftFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Shift retrieved successfully',
        data: result,
    });
});

const updateShift = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ShiftServices.updateShiftIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Shift updated successfully',
        data: result,
    });
});

const deleteShift = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ShiftServices.deleteShiftFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Shift deleted successfully',
        data: result,
    });
});

const getShiftsByEmployee = catchAsync(async (req, res) => {
    const { employeeId } = req.params;
    const result = await ShiftServices.getShiftsByEmployeeFromDB(employeeId, req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Employee shifts retrieved successfully',
        data: result,
    });
});

export const ShiftControllers = {
    createShift,
    getAllShifts,
    getSingleShift,
    updateShift,
    deleteShift,
    getShiftsByEmployee,
};
