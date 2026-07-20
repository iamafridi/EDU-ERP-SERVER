import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { FeeServices } from './fee.service';

const generateFee = catchAsync(async (req, res) => {
    const { academicSemester, dueDate } = req.body;
    const student = req.user?.role === 'student' ? req.user.profileId : req.body.student;
    const result = await FeeServices.generateFeeForStudentIntoDB(
        student,
        academicSemester,
        new Date(dueDate),
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee generated successfully',
        data: result,
    });
});

const getAllFees = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'fee');
    const { data, meta } = await FeeServices.getAllFeesFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fees retrieved successfully',
        meta,
        data,
    });
});

const getSingleFee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FeeServices.getSingleFeeFromDB(id);
    assertOwnership(req, result, 'fee');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee retrieved successfully',
        data: result,
    });
});

const updateFee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await FeeServices.getSingleFeeFromDB(id);
    assertOwnership(req, record, 'fee');
    const result = await FeeServices.updateFeeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee updated successfully',
        data: result,
    });
});

const deleteFee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await FeeServices.getSingleFeeFromDB(id);
    assertOwnership(req, record, 'fee');
    const result = await FeeServices.deleteFeeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fee deleted successfully',
        data: result,
    });
});

const bulkGenerateFee = catchAsync(async (req, res) => {
    const { academicSemester, dueDate } = req.body;
    const result = await FeeServices.bulkGenerateFeeIntoDB(
        academicSemester,
        new Date(dueDate),
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Bulk fee generation completed. ${result.generatedCount} generated, ${result.skippedCount} skipped.`,
        data: result,
    });
});

export const FeeControllers = {
    generateFee,
    bulkGenerateFee,
    getAllFees,
    getSingleFee,
    updateFee,
    deleteFee,
};
