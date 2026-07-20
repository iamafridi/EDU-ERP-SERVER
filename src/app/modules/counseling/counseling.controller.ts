import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CounselingServices } from './counseling.service';

const createCounseling = catchAsync(async (req, res) => {
    const result = await CounselingServices.createCounselingIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Counseling session created successfully',
        data: result,
    });
});

const getAllCounselings = catchAsync(async (req, res) => {
    const { data, meta } = await CounselingServices.getAllCounselingsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Counseling sessions retrieved successfully',
        meta,
        data,
    });
});

const getSingleCounseling = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CounselingServices.getSingleCounselingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Counseling session retrieved successfully',
        data: result,
    });
});

const updateCounseling = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CounselingServices.updateCounselingIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Counseling session updated successfully',
        data: result,
    });
});

const deleteCounseling = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CounselingServices.deleteCounselingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Counseling session deleted successfully',
        data: result,
    });
});

export const CounselingControllers = {
    createCounseling,
    getAllCounselings,
    getSingleCounseling,
    updateCounseling,
    deleteCounseling,
};
