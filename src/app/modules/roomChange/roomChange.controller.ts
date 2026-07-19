import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomChangeServices } from './roomChange.service';

const createRoomChange = catchAsync(async (req, res) => {
    const result = await RoomChangeServices.createRoomChangeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Room change request submitted successfully',
        data: result,
    });
});

const getAllRoomChanges = catchAsync(async (req, res) => {
    const { data, meta } = await RoomChangeServices.getAllRoomChangesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room change requests retrieved successfully',
        meta,
        data,
    });
});

const getSingleRoomChange = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomChangeServices.getSingleRoomChangeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room change request retrieved successfully',
        data: result,
    });
});

const approveRoomChange = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomChangeServices.approveRoomChangeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Room change request ${req.body.status} successfully`,
        data: result,
    });
});

const deleteRoomChange = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomChangeServices.deleteRoomChangeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room change request deleted successfully',
        data: result,
    });
});

export const RoomChangeControllers = {
    createRoomChange,
    getAllRoomChanges,
    getSingleRoomChange,
    approveRoomChange,
    deleteRoomChange,
};
