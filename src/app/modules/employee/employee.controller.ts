import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EmployeeServices } from './employee.service';

const createEmployee = catchAsync(async (req, res) => {
    const result = await EmployeeServices.createEmployeeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Employee created successfully',
        data: result,
    });
});

const getAllEmployees = catchAsync(async (req, res) => {
    const { data, meta } = await EmployeeServices.getAllEmployeesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Employees retrieved successfully',
        meta,
        data,
    });
});

const getSingleEmployee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeServices.getSingleEmployeeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Employee retrieved successfully',
        data: result,
    });
});

const updateEmployee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeServices.updateEmployeeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Employee updated successfully',
        data: result,
    });
});

const deleteEmployee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeServices.deleteEmployeeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Employee deleted successfully',
        data: result,
    });
});

export const EmployeeControllers = {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
};
