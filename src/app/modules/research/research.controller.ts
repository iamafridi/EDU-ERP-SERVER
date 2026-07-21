import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ResearchServices } from './research.service';

const createResearch = catchAsync(async (req, res) => {
    const result = await ResearchServices.createResearchIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Research record created successfully',
        data: result,
    });
});

const getAllResearch = catchAsync(async (req, res) => {
    const { data, meta } = await ResearchServices.getAllResearchFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Research records retrieved successfully',
        meta,
        data,
    });
});

const getSingleResearch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ResearchServices.getSingleResearchFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Research record retrieved successfully',
        data: result,
    });
});

const updateResearch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ResearchServices.updateResearchIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Research record updated successfully',
        data: result,
    });
});

const deleteResearch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ResearchServices.deleteResearchFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Research record deleted successfully',
        data: result,
    });
});

export const ResearchControllers = {
    createResearch,
    getAllResearch,
    getSingleResearch,
    updateResearch,
    deleteResearch,
};
