import { Types } from 'mongoose';

export type TAdmissionStatus = 'admitted' | 'transferred' | 'discharged';

export type TWardType = 'general' | 'semi-private' | 'private' | 'icu' | 'nicu' | 'picu' | 'emergency' | 'isolation';

export type TIPDAdmission = {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    ward: TWardType;
    bedNumber: string;
    admissionDate: Date;
    diagnosis: string;
    status: TAdmissionStatus;
    notes?: string;
    isDeleted: boolean;
};

export type TIPDDischarge = {
    admissionId: Types.ObjectId;
    dischargeDate: Date;
    dischargeType: 'regular' | 'against-medical-advice' | 'referred' | 'expired';
    dischargeSummary: string;
    followUpInstructions?: string;
    isDeleted: boolean;
};
