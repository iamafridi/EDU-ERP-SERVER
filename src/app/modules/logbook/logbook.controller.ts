import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LogbookServices } from './logbook.service';

const createClinicalProcedure = catchAsync(async (req, res) => {
    const result = await LogbookServices.createClinicalProcedureIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Clinical procedure created successfully',
        data: result,
    });
});

const getAllClinicalProcedures = catchAsync(async (req, res) => {
    const { data, meta } = await LogbookServices.getAllClinicalProceduresFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical procedures retrieved successfully',
        meta,
        data,
    });
});

const getSingleClinicalProcedure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.getSingleClinicalProcedureFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical procedure retrieved successfully',
        data: result,
    });
});

const updateClinicalProcedure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.updateClinicalProcedureIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical procedure updated successfully',
        data: result,
    });
});

const deleteClinicalProcedure = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.deleteClinicalProcedureFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Clinical procedure deleted successfully',
        data: result,
    });
});

const createLogEntry = catchAsync(async (req, res) => {
    const result = await LogbookServices.createLogEntryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Log entry created successfully',
        data: result,
    });
});

const getAllLogEntries = catchAsync(async (req, res) => {
    const { data, meta } = await LogbookServices.getAllLogEntriesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Log entries retrieved successfully',
        meta,
        data,
    });
});

const getStudentLogEntries = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await LogbookServices.getStudentLogEntriesFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student log entries retrieved successfully',
        data: result,
    });
});

const updateLogEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.updateLogEntryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Log entry updated successfully',
        data: result,
    });
});

const deleteLogEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.deleteLogEntryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Log entry deleted successfully',
        data: result,
    });
});

const getStudentSummary = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await LogbookServices.getStudentSummaryFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student competency summary retrieved',
        data: result,
    });
});

const signOffLogEntry = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LogbookServices.signOffLogEntryIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Log entry signed off successfully',
        data: result,
    });
});

export const LogbookControllers = {
    createClinicalProcedure,
    getAllClinicalProcedures,
    getSingleClinicalProcedure,
    updateClinicalProcedure,
    deleteClinicalProcedure,
    createLogEntry,
    getAllLogEntries,
    getStudentLogEntries,
    updateLogEntry,
    deleteLogEntry,
    getStudentSummary,
    signOffLogEntry,
};
