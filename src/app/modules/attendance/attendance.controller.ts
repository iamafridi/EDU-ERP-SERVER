import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { AttendanceServices } from './attendance.service';

const createAttendance = catchAsync(async (req, res) => {
    const result = await AttendanceServices.createAttendanceIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Attendance marked successfully',
        data: result,
    });
});

const bulkCreateAttendance = catchAsync(async (req, res) => {
    const result = await AttendanceServices.bulkCreateAttendanceIntoDB(
        req.body,
        req.user.userId,
        req.body.academicSemester,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bulk attendance marked successfully',
        data: result,
    });
});

const getAllAttendance = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'attendance');
    const { data, meta } = await AttendanceServices.getAllAttendanceFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance records retrieved successfully',
        meta,
        data,
    });
});

const getAttendanceReport = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'attendance');
    const result = await AttendanceServices.getAttendanceReportFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance report generated successfully',
        data: result,
    });
});

const updateAttendance = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await AttendanceServices.getSingleAttendanceFromDB(id);
    assertOwnership(req, record, 'attendance');
    const result = await AttendanceServices.updateAttendanceIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance updated successfully',
        data: result,
    });
});

const deleteAttendance = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await AttendanceServices.getSingleAttendanceFromDB(id);
    assertOwnership(req, record, 'attendance');
    const result = await AttendanceServices.deleteAttendanceFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance record deleted successfully',
        data: result,
    });
});

const bulkDateRangeCreateAttendance = catchAsync(async (req, res) => {
    const result = await AttendanceServices.bulkDateRangeCreateAttendanceIntoDB(
        req.body,
        req.user.userId,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Date-range attendance marked successfully',
        data: result,
    });
});

export const AttendanceControllers = {
    createAttendance,
    bulkCreateAttendance,
    bulkDateRangeCreateAttendance,
    getAllAttendance,
    getAttendanceReport,
    updateAttendance,
    deleteAttendance,
};
