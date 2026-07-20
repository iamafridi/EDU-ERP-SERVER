import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReportServices } from './report.service';

const createReport = catchAsync(async (req, res) => {
    const result = await ReportServices.createReportIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Report generation started',
        data: result,
    });
});

const getAllReports = catchAsync(async (req, res) => {
    const { data, meta } = await ReportServices.getAllReportsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reports retrieved successfully',
        meta,
        data,
    });
});

const getSingleReport = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReportServices.getSingleReportFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Report retrieved successfully',
        data: result,
    });
});

const deleteReport = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReportServices.deleteReportFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Report deleted successfully',
        data: result,
    });
});

export const ReportControllers = {
    createReport,
    getAllReports,
    getSingleReport,
    deleteReport,
};
