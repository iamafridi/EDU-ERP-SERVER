import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TimetableServices } from './timetable.service';

const createTimetable = catchAsync(async (req, res) => {
    const result = await TimetableServices.createTimetableIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Timetable created successfully',
        data: result,
    });
});

const getAllTimetables = catchAsync(async (req, res) => {
    const { data, meta } = await TimetableServices.getAllTimetablesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Timetables retrieved successfully',
        meta,
        data,
    });
});

const getSingleTimetable = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TimetableServices.getSingleTimetableFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Timetable retrieved successfully',
        data: result,
    });
});

const updateTimetable = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TimetableServices.updateTimetableIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Timetable updated successfully',
        data: result,
    });
});

const deleteTimetable = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TimetableServices.deleteTimetableFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Timetable deleted successfully',
        data: result,
    });
});

const addEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TimetableServices.addEntryToTimetableIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Entry added to timetable',
        data: result,
    });
});

const removeEntry = catchAsync(async (req, res) => {
    const { id, entryId } = req.params;
    const result = await TimetableServices.removeEntryFromTimetableIntoDB(id, entryId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Entry removed from timetable',
        data: result,
    });
});

const getGrid = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TimetableServices.generateGridFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Timetable grid generated',
        data: result,
    });
});

export const TimetableControllers = {
    createTimetable,
    getAllTimetables,
    getSingleTimetable,
    updateTimetable,
    deleteTimetable,
    addEntry,
    removeEntry,
    getGrid,
};
