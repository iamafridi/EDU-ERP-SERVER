import { Types } from 'mongoose';

export type TProcedureCategory = 'medical' | 'surgical' | 'obgyn' | 'pediatrics' | 'orthopedics' | 'ent' | 'ophthalmology' | 'psychiatry' | 'emergency' | 'other';

export type TCompetencyLevel = 'observed' | 'assisted' | 'performed' | 'competent';

export type TClinicalProcedure = {
    code: string;
    name: string;
    category: TProcedureCategory;
    minimumRequired: number;
    description?: string;
    isDeleted: boolean;
};

export type TLogEntry = {
    student: Types.ObjectId;
    procedure: Types.ObjectId;
    patientAge: number;
    patientGender: string;
    diagnosis: string;
    date: Date;
    supervisor: Types.ObjectId;
    supervisorSignOff: boolean;
    competency: TCompetencyLevel;
    notes?: string;
    isDeleted: boolean;
};

export type TCompetencySummary = {
    procedure: Types.ObjectId;
    totalLogs: number;
    byCompetency: Record<TCompetencyLevel, number>;
    minimumRequired: number;
    met: boolean;
};
