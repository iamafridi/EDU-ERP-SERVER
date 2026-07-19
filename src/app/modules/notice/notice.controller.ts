import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NoticeServices } from './notice.service';

const createNotice = catchAsync(async (req, res) => {
    const result = await NoticeServices.createNoticeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Notice published successfully',
        data: result,
    });
});

const getAllNotices = catchAsync(async (req, res) => {
    const { data, meta } = await NoticeServices.getAllNoticesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notices retrieved successfully',
        meta,
        data,
    });
});

const getSingleNotice = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await NoticeServices.getSingleNoticeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notice retrieved successfully',
        data: result,
    });
});

const updateNotice = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await NoticeServices.updateNoticeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notice updated successfully',
        data: result,
    });
});

const deleteNotice = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await NoticeServices.deleteNoticeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notice deleted successfully',
        data: result,
    });
});

export const NoticeControllers = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
};
