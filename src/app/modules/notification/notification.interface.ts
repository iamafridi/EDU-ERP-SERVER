import { Types } from 'mongoose';

export type TNotificationType = 'info' | 'alert' | 'reminder' | 'emergency';
export type TNotificationChannel = 'in-app' | 'email' | 'sms' | 'all';

export type TNotification = {
    recipient: Types.ObjectId;
    type: TNotificationType;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    read: boolean;
    readAt?: Date;
    channel: TNotificationChannel;
    isDeleted: boolean;
};
