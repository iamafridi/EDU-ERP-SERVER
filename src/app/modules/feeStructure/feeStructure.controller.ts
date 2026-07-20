import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeeStructureServices } from './feeStructure.service';

const createFeeStructure = catchAsync(async (req, res) => {
    const result = await FeeStructureServices.createFeeStructureIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Fee structure created successfully',
        data: result,
    });
});

const getAllFeeStructures = catchAsync(async (req, res) => {
    const { data, meta } = await FeeStructureServices.getAllFeeStructuresFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee structures retrieved successfully',
        meta,
        data,
    });
});

const getSingleFeeStructure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FeeStructureServices.getSingleFeeStructureFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee structure retrieved successfully',
        data: result,
    });
});

const updateFeeStructure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FeeStructureServices.updateFeeStructureIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee structure updated successfully',
        data: result,
    });
});

const deleteFeeStructure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FeeStructureServices.deleteFeeStructureFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee structure deleted successfully',
        data: result,
    });
});

export const FeeStructureControllers = {
    createFeeStructure,
    getAllFeeStructures,
    getSingleFeeStructure,
    updateFeeStructure,
    deleteFeeStructure,
};
