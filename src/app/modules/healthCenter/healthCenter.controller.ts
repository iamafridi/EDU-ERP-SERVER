import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { HealthCenterServices } from './healthCenter.service';

const createHealthCenter = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await HealthCenterServices.createHealthCenterIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Health center record created successfully',
        data: result,
    });
});

const getAllHealthCenters = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'health-center');
    const { data, meta } = await HealthCenterServices.getAllHealthCentersFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Health center records retrieved successfully',
        meta,
        data,
    });
});

const getSingleHealthCenter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HealthCenterServices.getSingleHealthCenterFromDB(id);
    assertOwnership(req, result, 'health-center');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Health center record retrieved successfully',
        data: result,
    });
});

const updateHealthCenter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await HealthCenterServices.getSingleHealthCenterFromDB(id);
    assertOwnership(req, record, 'health-center');
    const result = await HealthCenterServices.updateHealthCenterIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Health center record updated successfully',
        data: result,
    });
});

const deleteHealthCenter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await HealthCenterServices.getSingleHealthCenterFromDB(id);
    assertOwnership(req, record, 'health-center');
    const result = await HealthCenterServices.deleteHealthCenterFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Health center record deleted successfully',
        data: result,
    });
});

export const HealthCenterControllers = {
    createHealthCenter,
    getAllHealthCenters,
    getSingleHealthCenter,
    updateHealthCenter,
    deleteHealthCenter,
};
