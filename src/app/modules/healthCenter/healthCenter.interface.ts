import { Types } from 'mongoose';

export type THealthCenter = {
    student: Types.ObjectId;
    visitDate: Date;
    symptoms: string[];
    diagnosis?: string;
    prescription?: string;
    doctor: Types.ObjectId;
    followUpDate?: Date;
    medicalLeaveDays?: number;
    isDeleted: boolean;
};
