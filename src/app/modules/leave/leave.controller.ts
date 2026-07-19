import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LeaveServices } from './leave.service';

const createLeave = catchAsync(async (req, res) => {
    const result = await LeaveServices.createLeaveIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Leave application submitted successfully',
        data: result,
    });
});

const getAllLeaves = catchAsync(async (req, res) => {
    const { data, meta } = await LeaveServices.getAllLeavesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leaves retrieved successfully',
        meta,
        data,
    });
});

const getSingleLeave = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LeaveServices.getSingleLeaveFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leave retrieved successfully',
        data: result,
    });
});

const updateLeave = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LeaveServices.updateLeaveIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leave updated successfully',
        data: result,
    });
});

const deleteLeave = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LeaveServices.deleteLeaveFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leave deleted successfully',
        data: result,
    });
});

const approveLeave = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LeaveServices.approveLeaveIntoDB(id, req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leave approved successfully',
        data: result,
    });
});

const rejectLeave = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;
    const result = await LeaveServices.rejectLeaveIntoDB(id, remarks);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Leave rejected',
        data: result,
    });
});

export const LeaveControllers = {
    createLeave,
    getAllLeaves,
    getSingleLeave,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave,
};
