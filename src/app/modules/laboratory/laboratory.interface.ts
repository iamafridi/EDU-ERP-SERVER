import { Types } from 'mongoose';

export type TTestCategory = 'biochemistry' | 'hematology' | 'microbiology' | 'pathology' | 'immunology' | 'radiology' | 'other';

export type TRequestStatus = 'pending' | 'collected' | 'processing' | 'completed' | 'cancelled';

export type TSampleType = 'blood' | 'urine' | 'stool' | 'sputum' | 'csf' | 'tissue' | 'swab' | 'other';

export type TLabTest = {
    code: string;
    name: string;
    category: TTestCategory;
    sampleType: TSampleType;
    normalRange: string;
    unit: string;
    price: number;
    isDeleted: boolean;
};

export type TLabRequest = {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    tests: Types.ObjectId[];
    requestDate: Date;
    status: TRequestStatus;
    notes?: string;
    isDeleted: boolean;
};

export type TLabResult = {
    requestId: Types.ObjectId;
    testId: Types.ObjectId;
    resultValue: string;
    normalRange: string;
    remarks?: string;
    technicianId: Types.ObjectId;
    resultDate: Date;
    isDeleted: boolean;
};
