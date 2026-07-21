import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillLabServices } from './skillLab.service';

const createSkillLab = catchAsync(async (req, res) => {
    const result = await SkillLabServices.createSkillLabIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Skill lab record created successfully',
        data: result,
    });
});

const getAllSkillLabs = catchAsync(async (req, res) => {
    const { data, meta } = await SkillLabServices.getAllSkillLabsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill lab records retrieved successfully',
        meta,
        data,
    });
});

const getSingleSkillLab = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillLabServices.getSingleSkillLabFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill lab record retrieved successfully',
        data: result,
    });
});

const updateSkillLab = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillLabServices.updateSkillLabIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill lab record updated successfully',
        data: result,
    });
});

const deleteSkillLab = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillLabServices.deleteSkillLabFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill lab record deleted successfully',
        data: result,
    });
});

export const SkillLabControllers = {
    createSkillLab,
    getAllSkillLabs,
    getSingleSkillLab,
    updateSkillLab,
    deleteSkillLab,
};
