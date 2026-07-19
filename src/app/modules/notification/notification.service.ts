import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { NotificationSearchableFields } from './notification.constant';
import { TNotification } from './notification.interface';
import { Notification } from './notification.model';

const createNotificationIntoDB = async (payload: TNotification) => {
    const result = await Notification.create(payload);
    return result;
};

const getAllNotificationsFromDB = async (
    userId: string,
    query: Record<string, unknown>,
) => {
    const notificationQuery = new QueryBuilder(
        Notification.find({ recipient: userId }),
        query,
    )
        .search(NotificationSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await notificationQuery.modelQuery;
    const meta = await notificationQuery.countTotal();
    return { data, meta };
};

const getUnreadCountFromDB = async (userId: string) => {
    return await Notification.countDocuments({ recipient: userId, read: false, isDeleted: false });
};

const markAsReadIntoDB = async (id: string, userId: string) => {
    const result = await Notification.findOneAndUpdate(
        { _id: id, recipient: userId },
        { read: true, readAt: new Date() },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
    return result;
};

const markAllAsReadIntoDB = async (userId: string) => {
    const result = await Notification.updateMany(
        { recipient: userId, read: false },
        { read: true, readAt: new Date() },
    );
    return result;
};

const deleteNotificationFromDB = async (id: string, userId: string) => {
    const result = await Notification.findOneAndUpdate(
        { _id: id, recipient: userId },
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
    return result;
};

const getActivityFeedFromDB = async (userId: string) => {
    const notifications = await Notification.find({ recipient: userId, isDeleted: false })
        .sort({ createdAt: -1 as const })
        .limit(20)
        .lean();

    const activities = notifications.map((n) => ({
        id: n._id,
        user: 'System',
        action: n.read ? 'read' : 'new',
        target: n.title,
        timestamp: (n as any).createdAt,
    }));

    return activities;
};

export const NotificationServices = {
    createNotificationIntoDB,
    getAllNotificationsFromDB,
    getUnreadCountFromDB,
    markAsReadIntoDB,
    markAllAsReadIntoDB,
    deleteNotificationFromDB,
    getActivityFeedFromDB,
};
