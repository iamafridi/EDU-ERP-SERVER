import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScheduleServices } from './schedule.service';

const createSchedule = catchAsync(async (req, res) => {
    const result = await ScheduleServices.createScheduleIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Schedule created successfully',
        data: result,
    });
});

const getAllSchedules = catchAsync(async (req, res) => {
    const { data, meta } = await ScheduleServices.getAllSchedulesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedules retrieved successfully',
        meta,
        data,
    });
});

const getSingleSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleServices.getSingleScheduleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule retrieved successfully',
        data: result,
    });
});

const updateSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleServices.updateScheduleIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule updated successfully',
        data: result,
    });
});

const deleteSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleServices.deleteScheduleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
});

const createCalendarEvent = catchAsync(async (req, res) => {
    const result = await ScheduleServices.createCalendarEventIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Calendar event created successfully',
        data: result,
    });
});

const getAllCalendarEvents = catchAsync(async (req, res) => {
    const { data, meta } = await ScheduleServices.getAllCalendarEventsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Calendar events retrieved successfully',
        meta,
        data,
    });
});

const updateCalendarEvent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleServices.updateCalendarEventIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Calendar event updated successfully',
        data: result,
    });
});

const deleteCalendarEvent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleServices.deleteCalendarEventFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Calendar event deleted successfully',
        data: result,
    });
});

export const ScheduleControllers = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
    createCalendarEvent,
    getAllCalendarEvents,
    updateCalendarEvent,
    deleteCalendarEvent,
};
