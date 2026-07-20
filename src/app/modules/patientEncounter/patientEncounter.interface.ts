import { Types } from 'mongoose';

export type TPatientGender = 'male' | 'female' | 'other';

export type TPatientEncounter = {
    student: Types.ObjectId;
    patientName: string;
    patientAge: number;
    patientGender: TPatientGender;
    diagnosis: string;
    procedures: string[];
    date: Date;
    supervisedBy: Types.ObjectId;
    department: string;
    notes?: string;
    isDeleted: boolean;
};
