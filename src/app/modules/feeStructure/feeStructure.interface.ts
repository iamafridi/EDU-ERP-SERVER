import { Types } from 'mongoose';

export type TFeeCategory = 'tuition' | 'hostel' | 'transport' | 'library' | 'other';

export type TFeeStructure = {
    name: string;
    amount: number;
    category: TFeeCategory;
    academicSemester: Types.ObjectId;
    applicableTo: string[];
    isOptional: boolean;
    isDeleted: boolean;
};
