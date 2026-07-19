import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { GrievanceServices } from './grievance.service';

const createGrievance = catchAsync(async (req, res) => {
    const body = { ...req.body, complainant: req.user?.userId };
    const result = await GrievanceServices.createGrievanceIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Grievance submitted successfully',
        data: result,
    });
});

const getAllGrievances = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'grievance');
    const { data, meta } = await GrievanceServices.getAllGrievancesFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grievances retrieved successfully',
        meta,
        data,
    });
});

const getSingleGrievance = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await GrievanceServices.getSingleGrievanceFromDB(id);
    assertOwnership(req, result, 'grievance');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grievance retrieved successfully',
        data: result,
    });
});

const updateGrievance = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await GrievanceServices.getSingleGrievanceFromDB(id);
    assertOwnership(req, record, 'grievance');
    const result = await GrievanceServices.updateGrievanceIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grievance updated successfully',
        data: result,
    });
});

const deleteGrievance = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await GrievanceServices.getSingleGrievanceFromDB(id);
    assertOwnership(req, record, 'grievance');
    const result = await GrievanceServices.deleteGrievanceFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Grievance deleted successfully',
        data: result,
    });
});

export const GrievanceControllers = {
    createGrievance,
    getAllGrievances,
    getSingleGrievance,
    updateGrievance,
    deleteGrievance,
};
