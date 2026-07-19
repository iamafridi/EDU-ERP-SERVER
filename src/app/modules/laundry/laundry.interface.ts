import { Types } from 'mongoose';

export type TLaundryStatus = 'pending' | 'picked-up' | 'ready' | 'delivered';

export type TLaundryRequest = {
    student: Types.ObjectId;
    pickupDate: Date;
    deliveryDate?: Date;
    items: string[];
    status: TLaundryStatus;
    totalAmount?: number;
    isDeleted: boolean;
};
