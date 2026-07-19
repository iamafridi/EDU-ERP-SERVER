import { Types } from 'mongoose';

export type TInventoryCategory = 'furniture' | 'linens' | 'appliance' | 'other';
export type TItemCondition = 'new' | 'good' | 'fair' | 'poor';

export type TInventoryItem = {
    name: string;
    category: TInventoryCategory;
    room?: Types.ObjectId;
    quantity: number;
    condition: TItemCondition;
    notes?: string;
    isDeleted: boolean;
};
