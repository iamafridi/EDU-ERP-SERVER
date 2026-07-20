import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScholarshipServices } from './scholarship.service';

const createScholarship = catchAsync(async (req, res) => {
    const result = await ScholarshipServices.createScholarshipIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Scholarship created successfully',
        data: result,
    });
});

const getAllScholarships = catchAsync(async (req, res) => {
    const { data, meta } = await ScholarshipServices.getAllScholarshipsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarships retrieved successfully',
        meta,
        data,
    });
});

const getSingleScholarship = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScholarshipServices.getSingleScholarshipFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship retrieved successfully',
        data: result,
    });
});

const updateScholarship = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScholarshipServices.updateScholarshipIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship updated successfully',
        data: result,
    });
});

const deleteScholarship = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScholarshipServices.deleteScholarshipFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship deleted successfully',
        data: result,
    });
});

const approveScholarship = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScholarshipServices.approveScholarshipIntoDB(
        id,
        req.user.userId,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship approved successfully',
        data: result,
    });
});

const rejectScholarship = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;
    const result = await ScholarshipServices.rejectScholarshipIntoDB(id, remarks);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship rejected',
        data: result,
    });
});

export const ScholarshipControllers = {
    createScholarship,
    getAllScholarships,
    getSingleScholarship,
    updateScholarship,
    deleteScholarship,
    approveScholarship,
    rejectScholarship,
};
