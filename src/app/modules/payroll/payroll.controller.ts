import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PayrollServices } from './payroll.service';

const createPayroll = catchAsync(async (req, res) => {
    const result = await PayrollServices.createPayrollIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Payroll created successfully',
        data: result,
    });
});

const getAllPayrolls = catchAsync(async (req, res) => {
    const { data, meta } = await PayrollServices.getAllPayrollsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payrolls retrieved successfully',
        meta,
        data,
    });
});

const getSinglePayroll = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PayrollServices.getSinglePayrollFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payroll retrieved successfully',
        data: result,
    });
});

const updatePayroll = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PayrollServices.updatePayrollIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payroll updated successfully',
        data: result,
    });
});

const deletePayroll = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PayrollServices.deletePayrollFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payroll deleted successfully',
        data: result,
    });
});

const markPayrollPaid = catchAsync(async (req, res) => {
    const { id } = req.params;
    const paymentDate = req.body.paymentDate
        ? new Date(req.body.paymentDate)
        : new Date();
    const result = await PayrollServices.markPayrollPaidIntoDB(id, paymentDate);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payroll marked as paid successfully',
        data: result,
    });
});

const getSalarySlip = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PayrollServices.getSalarySlipFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Salary slip retrieved successfully',
        data: result,
    });
});

export const PayrollControllers = {
    createPayroll,
    getAllPayrolls,
    getSinglePayroll,
    updatePayroll,
    deletePayroll,
    markPayrollPaid,
    getSalarySlip,
};
