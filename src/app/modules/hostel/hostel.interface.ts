import { Types } from 'mongoose';

export type TInspectionItem = {
    item: string;
    condition: string;
    notes?: string;
};

export type THostelStatus = 'checked-in' | 'checked-out';

export type THostelCheckIn = {
    student: Types.ObjectId;
    room: Types.ObjectId;
    checkInDate: Date;
    checkOutDate?: Date;
    depositAmount: number;
    depositPaid: boolean;
    depositRefunded?: boolean;
    inspectionChecklist?: TInspectionItem[];
    status: THostelStatus;
    isDeleted: boolean;
};
