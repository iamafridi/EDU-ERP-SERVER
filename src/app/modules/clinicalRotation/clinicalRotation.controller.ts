import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClinicalRotationServices } from './clinicalRotation.service';

const createClinicalRotation = catchAsync(async (req, res) => {
    const result = await ClinicalRotationServices.createClinicalRotationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Clinical rotation created successfully',
        data: result,
    });
});

const getAllClinicalRotations = catchAsync(async (req, res) => {
    const { data, meta } = await ClinicalRotationServices.getAllClinicalRotationsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical rotations retrieved successfully',
        meta,
        data,
    });
});

const getSingleClinicalRotation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClinicalRotationServices.getSingleClinicalRotationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical rotation retrieved successfully',
        data: result,
    });
});

const updateClinicalRotation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClinicalRotationServices.updateClinicalRotationIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical rotation updated successfully',
        data: result,
    });
});

const deleteClinicalRotation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClinicalRotationServices.deleteClinicalRotationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical rotation deleted successfully',
        data: result,
    });
});

export const ClinicalRotationControllers = {
    createClinicalRotation,
    getAllClinicalRotations,
    getSingleClinicalRotation,
    updateClinicalRotation,
    deleteClinicalRotation,
};
