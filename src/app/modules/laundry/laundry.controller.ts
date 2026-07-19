import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LaundryServices } from './laundry.service';

const createLaundryRequest = catchAsync(async (req, res) => {
    const result = await LaundryServices.createLaundryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Laundry request created successfully',
        data: result,
    });
});

const getAllLaundryRequests = catchAsync(async (req, res) => {
    const { data, meta } = await LaundryServices.getAllLaundryFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Laundry requests retrieved successfully',
        meta,
        data,
    });
});

const getSingleLaundryRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaundryServices.getSingleLaundryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Laundry request retrieved successfully',
        data: result,
    });
});

const updateLaundryRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaundryServices.updateLaundryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Laundry request updated successfully',
        data: result,
    });
});

const deleteLaundryRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LaundryServices.deleteLaundryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Laundry request deleted successfully',
        data: result,
    });
});

export const LaundryControllers = {
    createLaundryRequest,
    getAllLaundryRequests,
    getSingleLaundryRequest,
    updateLaundryRequest,
    deleteLaundryRequest,
};
