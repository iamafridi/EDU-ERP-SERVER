import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CurriculumServices } from './curriculum.service';

const createCourseOutcome = catchAsync(async (req, res) => {
    const result = await CurriculumServices.createCourseOutcomeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course Outcome created successfully',
        data: result,
    });
});

const getAllCourseOutcomes = catchAsync(async (req, res) => {
    const { data, meta } = await CurriculumServices.getAllCourseOutcomesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Outcomes retrieved successfully',
        meta,
        data,
    });
});

const getSingleCourseOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.getSingleCourseOutcomeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Outcome retrieved successfully',
        data: result,
    });
});

const updateCourseOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.updateCourseOutcomeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Outcome updated successfully',
        data: result,
    });
});

const deleteCourseOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.deleteCourseOutcomeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Outcome deleted successfully',
        data: result,
    });
});

const createProgramOutcome = catchAsync(async (req, res) => {
    const result = await CurriculumServices.createProgramOutcomeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Program Outcome created successfully',
        data: result,
    });
});

const getAllProgramOutcomes = catchAsync(async (req, res) => {
    const { data, meta } = await CurriculumServices.getAllProgramOutcomesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Program Outcomes retrieved successfully',
        meta,
        data,
    });
});

const getSingleProgramOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.getSingleProgramOutcomeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Program Outcome retrieved successfully',
        data: result,
    });
});

const updateProgramOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.updateProgramOutcomeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Program Outcome updated successfully',
        data: result,
    });
});

const deleteProgramOutcome = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.deleteProgramOutcomeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Program Outcome deleted successfully',
        data: result,
    });
});

const createCurriculumMap = catchAsync(async (req, res) => {
    const result = await CurriculumServices.createCurriculumMapIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Curriculum Map created successfully',
        data: result,
    });
});

const getAllCurriculumMaps = catchAsync(async (req, res) => {
    const { data, meta } = await CurriculumServices.getAllCurriculumMapsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Curriculum Maps retrieved successfully',
        meta,
        data,
    });
});

const getSingleCurriculumMap = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.getSingleCurriculumMapFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Curriculum Map retrieved successfully',
        data: result,
    });
});

const updateCurriculumMap = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.updateCurriculumMapIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Curriculum Map updated successfully',
        data: result,
    });
});

const deleteCurriculumMap = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CurriculumServices.deleteCurriculumMapFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Curriculum Map deleted successfully',
        data: result,
    });
});

const getCOPOMatrix = catchAsync(async (req, res) => {
    const { curriculumMapId } = req.params;
    const result = await CurriculumServices.generateCOPOMatrixFromDB(curriculumMapId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CO-PO Matrix generated successfully',
        data: result,
    });
});

const getCoverageReport = catchAsync(async (req, res) => {
    const { curriculumMapId } = req.params;
    const result = await CurriculumServices.getCoverageReportFromDB(curriculumMapId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Coverage report generated successfully',
        data: result,
    });
});

export const CurriculumControllers = {
    createCourseOutcome,
    getAllCourseOutcomes,
    getSingleCourseOutcome,
    updateCourseOutcome,
    deleteCourseOutcome,
    createProgramOutcome,
    getAllProgramOutcomes,
    getSingleProgramOutcome,
    updateProgramOutcome,
    deleteProgramOutcome,
    createCurriculumMap,
    getAllCurriculumMaps,
    getSingleCurriculumMap,
    updateCurriculumMap,
    deleteCurriculumMap,
    getCOPOMatrix,
    getCoverageReport,
};
