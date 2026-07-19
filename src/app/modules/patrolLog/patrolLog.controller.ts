import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatrolLogServices } from './patrolLog.service';

const createPatrolLog = catchAsync(async (req, res) => {
    const result = await PatrolLogServices.createPatrolLogIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Patrol log created successfully',
        data: result,
    });
});

const getAllPatrolLogs = catchAsync(async (req, res) => {
    const { data, meta } = await PatrolLogServices.getAllPatrolLogsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patrol logs retrieved successfully',
        meta,
        data,
    });
});

const getSinglePatrolLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatrolLogServices.getSinglePatrolLogFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patrol log retrieved successfully',
        data: result,
    });
});

const updatePatrolLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatrolLogServices.updatePatrolLogIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patrol log updated successfully',
        data: result,
    });
});

const deletePatrolLog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatrolLogServices.deletePatrolLogFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patrol log deleted successfully',
        data: result,
    });
});

export const PatrolLogControllers = {
    createPatrolLog,
    getAllPatrolLogs,
    getSinglePatrolLog,
    updatePatrolLog,
    deletePatrolLog,
};
