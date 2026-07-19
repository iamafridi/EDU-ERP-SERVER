import { Schema, model } from 'mongoose';
import { TNotification } from './notification.interface';
import { NotificationTypes, NotificationChannels } from './notification.constant';

const notificationSchema = new Schema<TNotification>(
    {
        recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: NotificationTypes, required: true },
        title: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        data: { type: Schema.Types.Mixed },
        read: { type: Boolean, default: false },
        readAt: { type: Date },
        channel: { type: String, enum: NotificationChannels, default: 'in-app' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

notificationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
notificationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Notification = model<TNotification>('Notification', notificationSchema);
