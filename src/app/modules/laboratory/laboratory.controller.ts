import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LaboratoryServices } from './laboratory.service';

const createLabTest = catchAsync(async (req, res) => {
    const result = await LaboratoryServices.createLabTestIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Lab test created successfully',
        data: result,
    });
});

const getAllLabTests = catchAsync(async (req, res) => {
    const { data, meta } = await LaboratoryServices.getAllLabTestsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab tests retrieved successfully',
        meta,
        data,
    });
});

const getSingleLabTest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaboratoryServices.getSingleLabTestFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab test retrieved successfully',
        data: result,
    });
});

const updateLabTest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaboratoryServices.updateLabTestIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab test updated successfully',
        data: result,
    });
});

const deleteLabTest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaboratoryServices.deleteLabTestFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab test deleted successfully',
        data: result,
    });
});

const createLabRequest = catchAsync(async (req, res) => {
    const result = await LaboratoryServices.createLabRequestIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Lab request created successfully',
        data: result,
    });
});

const getAllLabRequests = catchAsync(async (req, res) => {
    const { data, meta } = await LaboratoryServices.getAllLabRequestsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab requests retrieved successfully',
        meta,
        data,
    });
});

const updateLabRequestStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaboratoryServices.updateLabRequestStatusIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab request status updated successfully',
        data: result,
    });
});

const createLabResult = catchAsync(async (req, res) => {
    const result = await LaboratoryServices.createLabResultIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Lab result recorded successfully',
        data: result,
    });
});

const getResultsByRequest = catchAsync(async (req, res) => {
    const { requestId } = req.params;
    const result = await LaboratoryServices.getResultsByRequestFromDB(requestId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab results retrieved successfully',
        data: result,
    });
});

const updateLabResult = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaboratoryServices.updateLabResultIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lab result updated successfully',
        data: result,
    });
});

export const LaboratoryControllers = {
    createLabTest,
    getAllLabTests,
    getSingleLabTest,
    updateLabTest,
    deleteLabTest,
    createLabRequest,
    getAllLabRequests,
    updateLabRequestStatus,
    createLabResult,
    getResultsByRequest,
    updateLabResult,
};
