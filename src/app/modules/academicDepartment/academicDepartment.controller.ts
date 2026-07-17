import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Academic Department has created Successfully',
        data: result,
    });
});
// Get all academic Department
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Department have retrieved successfully',
        data: result,
    });
});

// Get a single Department by code
const getASingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
        await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department retrieved successfully',
        data: result,
    });
});

// Update one by ID
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is updated successfully',
        data: result,
    });
});

const deleteAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    await AcademicDepartmentServices.deleteAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department deleted successfully',
        data: null,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getASingleAcademicDepartment,
    getAllAcademicDepartments,
    updateAcademicDepartment,
    deleteAcademicDepartment,
};

//--->routes.ts