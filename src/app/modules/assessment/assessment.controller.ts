import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AssessmentServices } from './assessment.service';

const createAssessment = catchAsync(async (req, res) => {
    const result = await AssessmentServices.createAssessmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Assessment created successfully',
        data: result,
    });
});

const getAllAssessments = catchAsync(async (req, res) => {
    const { data, meta } = await AssessmentServices.getAllAssessmentsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assessments retrieved successfully',
        meta,
        data,
    });
});

const getSingleAssessment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssessmentServices.getSingleAssessmentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assessment retrieved successfully',
        data: result,
    });
});

const updateAssessment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssessmentServices.updateAssessmentIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assessment updated successfully',
        data: result,
    });
});

const deleteAssessment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssessmentServices.deleteAssessmentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assessment deleted successfully',
        data: result,
    });
});

const createAssessmentScore = catchAsync(async (req, res) => {
    const result = await AssessmentServices.createAssessmentScoreIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Assessment score recorded successfully',
        data: result,
    });
});

const bulkCreateAssessmentScores = catchAsync(async (req, res) => {
    const { assessment, scores, gradedBy } = req.body;
    const result = await AssessmentServices.bulkCreateAssessmentScoresIntoDB(assessment, scores, gradedBy);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Assessment scores recorded successfully',
        data: result,
    });
});

const getAssessmentScores = catchAsync(async (req, res) => {
    const { data, meta } = await AssessmentServices.getAssessmentScoresFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assessment scores retrieved successfully',
        meta,
        data,
    });
});

const calculateGrade = catchAsync(async (req, res) => {
    const { studentId, courseId, academicSemesterId } = req.params;
    const result = await AssessmentServices.calculateGradeForStudent(studentId, courseId, academicSemesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade calculated successfully',
        data: result,
    });
});

const getGradeBooks = catchAsync(async (req, res) => {
    const { data, meta } = await AssessmentServices.getGradeBooksFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade books retrieved successfully',
        meta,
        data,
    });
});

const getSingleGradeBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssessmentServices.getSingleGradeBookFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade book retrieved successfully',
        data: result,
    });
});

const publishResults = catchAsync(async (req, res) => {
    const { courseId, academicSemesterId } = req.params;
    const result = await AssessmentServices.publishResultsIntoDB(courseId, academicSemesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Results published successfully',
        data: result,
    });
});

export const AssessmentControllers = {
    createAssessment,
    getAllAssessments,
    getSingleAssessment,
    updateAssessment,
    deleteAssessment,
    createAssessmentScore,
    bulkCreateAssessmentScores,
    getAssessmentScores,
    calculateGrade,
    getGradeBooks,
    getSingleGradeBook,
    publishResults,
};
