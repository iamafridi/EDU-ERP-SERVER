import { Types } from 'mongoose';

export type TVisitorLog = {
    visitorName: string;
    contactNo: string;
    email?: string;
    student?: Types.ObjectId;
    purpose: string;
    preApproved: boolean;
    approvedBy?: Types.ObjectId;
    qrToken?: string;
    entryTime?: Date;
    exitTime?: Date;
    vehicleNumber?: string;
    idProof?: string;
    isDeleted: boolean;
};
