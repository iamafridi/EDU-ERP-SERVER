import { Types } from 'mongoose';

export type TDrugCategory = 'antibiotic' | 'analgesic' | 'antihypertensive' | 'antidiabetic' | 'antiviral' | 'antifungal' | 'vaccine' | 'iv-fluid' | 'supplement' | 'other';

export type TPrescriptionDrug = {
    drugId: Types.ObjectId;
    dosage: string;
    duration: string;
    instructions?: string;
};

export type TDrug = {
    code: string;
    name: string;
    category: TDrugCategory;
    manufacturer: string;
    unit: string;
    price: number;
    stock: number;
    reorderLevel: number;
    isDeleted: boolean;
};

export type TPrescription = {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    drugs: TPrescriptionDrug[];
    date: Date;
    notes?: string;
    isDeleted: boolean;
};

export type TDispensing = {
    prescriptionId: Types.ObjectId;
    pharmacistId: Types.ObjectId;
    dispensedDate: Date;
    notes?: string;
    isDeleted: boolean;
};
