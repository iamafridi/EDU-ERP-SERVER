import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamServices } from './exam.service';

const createExam = catchAsync(async (req, res) => {
    const result = await ExamServices.createExamIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Exam created successfully',
        data: result,
    });
});

const getAllExams = catchAsync(async (req, res) => {
    const { data, meta } = await ExamServices.getAllExamsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Exams retrieved successfully',
        meta,
        data,
    });
});

const getSingleExam = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExamServices.getSingleExamFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Exam retrieved successfully',
        data: result,
    });
});

const updateExam = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExamServices.updateExamIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Exam updated successfully',
        data: result,
    });
});

const deleteExam = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExamServices.deleteExamFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Exam deleted successfully',
        data: result,
    });
});

export const ExamControllers = {
    createExam,
    getAllExams,
    getSingleExam,
    updateExam,
    deleteExam,
};
