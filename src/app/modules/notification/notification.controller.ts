import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotificationServices } from './notification.service';

const createNotification = catchAsync(async (req, res) => {
    const result = await NotificationServices.createNotificationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Notification sent successfully',
        data: result,
    });
});

const getAllNotifications = catchAsync(async (req, res) => {
    const result = await NotificationServices.getAllNotificationsFromDB(
        req.user.userId,
        req.query,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notifications retrieved successfully',
        data: result,
    });
});

const getUnreadCount = catchAsync(async (req, res) => {
    const result = await NotificationServices.getUnreadCountFromDB(req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Unread count retrieved successfully',
        data: { unreadCount: result },
    });
});

const markAsRead = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await NotificationServices.markAsReadIntoDB(id, req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notification marked as read',
        data: result,
    });
});

const markAllAsRead = catchAsync(async (req, res) => {
    const result = await NotificationServices.markAllAsReadIntoDB(req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All notifications marked as read',
        data: result,
    });
});

const deleteNotification = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await NotificationServices.deleteNotificationFromDB(id, req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notification deleted successfully',
        data: result,
    });
});

const getActivityFeed = catchAsync(async (req, res) => {
    const result = await NotificationServices.getActivityFeedFromDB(req.user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Activity feed retrieved successfully',
        data: result,
    });
});

export const NotificationControllers = {
    createNotification,
    getAllNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getActivityFeed,
};
