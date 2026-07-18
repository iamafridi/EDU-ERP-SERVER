import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ParentServices } from './parent.service';

const createParent = catchAsync(async (req, res) => {
    const result = await ParentServices.createParentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Parent profile created successfully',
        data: result,
    });
});

const getAllParents = catchAsync(async (req, res) => {
    const { data, meta } = await ParentServices.getAllParentsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parents retrieved successfully',
        meta,
        data,
    });
});

const getSingleParent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ParentServices.getSingleParentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parent retrieved successfully',
        data: result,
    });
});

const getParentByUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await ParentServices.getParentByUserFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parent profile retrieved successfully',
        data: result,
    });
});

const updateParent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ParentServices.updateParentIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parent updated successfully',
        data: result,
    });
});

const deleteParent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ParentServices.deleteParentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parent deleted successfully',
        data: result,
    });
});

export const ParentControllers = {
    createParent,
    getAllParents,
    getSingleParent,
    getParentByUser,
    updateParent,
    deleteParent,
};
