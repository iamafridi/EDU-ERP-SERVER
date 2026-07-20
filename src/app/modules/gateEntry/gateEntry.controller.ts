import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GateEntryServices } from './gateEntry.service';

const createGateEntry = catchAsync(async (req, res) => {
    const result = await GateEntryServices.createGateEntryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Gate entry created successfully',
        data: result,
    });
});

const getAllGateEntries = catchAsync(async (req, res) => {
    const { data, meta } = await GateEntryServices.getAllGateEntriesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gate entries retrieved successfully',
        meta,
        data,
    });
});

const getSingleGateEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await GateEntryServices.getSingleGateEntryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gate entry retrieved successfully',
        data: result,
    });
});

const updateGateEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await GateEntryServices.updateGateEntryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gate entry updated successfully',
        data: result,
    });
});

const deleteGateEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await GateEntryServices.deleteGateEntryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gate entry deleted successfully',
        data: result,
    });
});

export const GateEntryControllers = {
    createGateEntry,
    getAllGateEntries,
    getSingleGateEntry,
    updateGateEntry,
    deleteGateEntry,
};
