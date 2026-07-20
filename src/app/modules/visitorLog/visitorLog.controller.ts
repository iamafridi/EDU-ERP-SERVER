import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VisitorLogServices } from './visitorLog.service';

const createVisitorLog = catchAsync(async (req, res) => {
    const result = await VisitorLogServices.createVisitorLogIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Visitor log created successfully',
        data: result,
    });
});

const getAllVisitorLogs = catchAsync(async (req, res) => {
    const { data, meta } = await VisitorLogServices.getAllVisitorLogsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visitor logs retrieved successfully',
        meta,
        data,
    });
});

const getSingleVisitorLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VisitorLogServices.getSingleVisitorLogFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visitor log retrieved successfully',
        data: result,
    });
});

const updateVisitorLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VisitorLogServices.updateVisitorLogIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visitor log updated successfully',
        data: result,
    });
});

const deleteVisitorLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VisitorLogServices.deleteVisitorLogFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visitor log deleted successfully',
        data: result,
    });
});

export const VisitorLogControllers = {
    createVisitorLog,
    getAllVisitorLogs,
    getSingleVisitorLog,
    updateVisitorLog,
    deleteVisitorLog,
};
