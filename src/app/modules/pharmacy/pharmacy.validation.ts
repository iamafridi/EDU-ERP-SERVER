import { z } from 'zod';
import { DrugCategories } from './pharmacy.constant';

const createDrugValidationSchema = z.object({
    body: z.object({
        code: z.string({ message: 'Code is required' }).min(1),
        name: z.string({ message: 'Name is required' }).min(1),
        category: z.enum([...DrugCategories] as [string, ...string[]]),
        manufacturer: z.string({ message: 'Manufacturer is required' }).min(1),
        unit: z.string({ message: 'Unit is required' }).min(1),
        price: z.number({ message: 'Price is required' }).min(0),
        stock: z.number({ message: 'Stock is required' }).min(0),
        reorderLevel: z.number({ message: 'Reorder level is required' }).min(0),
    }),
});

const updateDrugValidationSchema = z.object({
    body: z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        category: z.enum([...DrugCategories] as [string, ...string[]]).optional(),
        manufacturer: z.string().optional(),
        unit: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        reorderLevel: z.number().optional(),
    }),
});

const createPrescriptionValidationSchema = z.object({
    body: z.object({
        patientId: z.string({ message: 'Patient ID is required' }),
        doctorId: z.string({ message: 'Doctor ID is required' }),
        drugs: z.array(
            z.object({
                drugId: z.string(),
                dosage: z.string(),
                duration: z.string(),
                instructions: z.string().optional(),
            })
        ).min(1, 'At least one drug is required'),
        date: z.string().datetime(),
        notes: z.string().optional(),
    }),
});

const createDispensingValidationSchema = z.object({
    body: z.object({
        prescriptionId: z.string({ message: 'Prescription ID is required' }),
        pharmacistId: z.string({ message: 'Pharmacist ID is required' }),
        dispensedDate: z.string().datetime(),
        notes: z.string().optional(),
    }),
});

export const PharmacyValidations = {
    createDrugValidationSchema,
    updateDrugValidationSchema,
    createPrescriptionValidationSchema,
    createDispensingValidationSchema,
};
