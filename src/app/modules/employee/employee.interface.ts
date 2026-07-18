import { Types } from 'mongoose';

export type TEmploymentType = 'full-time' | 'part-time' | 'contract' | 'intern' | 'permanent';

export type TEmployee = {
    user?: Types.ObjectId;
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department?: Types.ObjectId;
    designation: string;
    employmentType: TEmploymentType;
    joiningDate: Date;
    salary?: number;
    address?: string;
    photo?: string;
    isDeleted: boolean;
};
