import { Types } from 'mongoose';

export type TGateEntryType = 'student' | 'visitor' | 'vehicle';

export type TGateEntry = {
    type: TGateEntryType;
    personName?: string;
    student?: Types.ObjectId;
    vehicleNumber?: string;
    contactNo?: string;
    purpose?: string;
    entryTime: Date;
    exitTime?: Date;
    isLateEntry: boolean;
    lateEntryReason?: string;
    authorizedBy: Types.ObjectId;
    notified: boolean;
    isDeleted: boolean;
};
