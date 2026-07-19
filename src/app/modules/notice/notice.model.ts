import { Schema, model } from 'mongoose';
import { TNotice } from './notice.interface';
import { NoticePriorities } from './notice.constant';

const noticeSchema = new Schema<TNotice>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        targetRoles: [{ type: String }],
        targetDepartments: [{ type: Schema.Types.ObjectId, ref: 'AcademicDepartment' }],
        priority: { type: String, enum: NoticePriorities, default: 'normal' },
        validFrom: { type: Date, required: true },
        validTo: { type: Date },
        attachments: [{ type: String }],
        publishedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

noticeSchema.virtual('active').get(function () {
    if (!this.validTo) return true;
    return new Date(this.validTo) >= new Date();
});

noticeSchema.set('toJSON', { virtuals: true });
noticeSchema.set('toObject', { virtuals: true });

noticeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
noticeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Notice = model<TNotice>('Notice', noticeSchema);
