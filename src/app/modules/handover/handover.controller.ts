import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HandoverServices } from './handover.service';

const createHandover = catchAsync(async (req, res) => {
    const result = await HandoverServices.createHandoverIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Handover created successfully',
        data: result,
    });
});

const getAllHandovers = catchAsync(async (req, res) => {
    const { data, meta } = await HandoverServices.getAllHandoversFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Handovers retrieved successfully',
        meta,
        data,
    });
});

const getSingleHandover = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HandoverServices.getSingleHandoverFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Handover retrieved successfully',
        data: result,
    });
});

const updateHandover = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HandoverServices.updateHandoverIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Handover updated successfully',
        data: result,
    });
});

const deleteHandover = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HandoverServices.deleteHandoverFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Handover deleted successfully',
        data: result,
    });
});

export const HandoverControllers = {
    createHandover,
    getAllHandovers,
    getSingleHandover,
    updateHandover,
    deleteHandover,
};
