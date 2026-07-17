import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { GradeServices } from './grade.service';

const createGrade = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await GradeServices.createGradeIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Grade recorded successfully',
        data: result,
    });
});

const bulkCreateGrades = catchAsync(async (req, res) => {
    const result = await GradeServices.bulkCreateGradesIntoDB(req.body.records);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grades recorded successfully',
        data: result,
    });
});

const getAllGrades = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'grade');
    const { data, meta } = await GradeServices.getAllGradesFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grades retrieved successfully',
        meta,
        data,
    });
});

const getSingleGrade = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await GradeServices.getSingleGradeFromDB(id);
    assertOwnership(req, result, 'grade');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade retrieved successfully',
        data: result,
    });
});

const updateGrade = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await GradeServices.getSingleGradeFromDB(id);
    assertOwnership(req, record, 'grade');
    const result = await GradeServices.updateGradeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade updated successfully',
        data: result,
    });
});

const deleteGrade = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await GradeServices.getSingleGradeFromDB(id);
    assertOwnership(req, record, 'grade');
    const result = await GradeServices.deleteGradeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grade deleted successfully',
        data: result,
    });
});

export const GradeControllers = {
    createGrade,
    bulkCreateGrades,
    getAllGrades,
    getSingleGrade,
    updateGrade,
    deleteGrade,
};
