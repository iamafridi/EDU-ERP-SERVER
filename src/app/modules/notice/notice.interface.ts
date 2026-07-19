import { Types } from 'mongoose';
import { TUserRole } from '../user/user.interface';

export type TNoticePriority = 'low' | 'normal' | 'high' | 'urgent';

export type TNotice = {
    title: string;
    content: string;
    targetRoles: TUserRole[];
    targetDepartments?: Types.ObjectId[];
    priority: TNoticePriority;
    validFrom: Date;
    validTo?: Date;
    attachments: string[];
    publishedBy: Types.ObjectId;
    isDeleted: boolean;
};
