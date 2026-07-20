import { z } from 'zod';
import { TestCategories, RequestStatuses, SampleTypes } from './laboratory.constant';

const createLabTestValidationSchema = z.object({
    body: z.object({
        code: z.string({ message: 'Code is required' }).min(1),
        name: z.string({ message: 'Name is required' }).min(1),
        category: z.enum([...TestCategories] as [string, ...string[]]),
        sampleType: z.enum([...SampleTypes] as [string, ...string[]]),
        normalRange: z.string({ message: 'Normal range is required' }).min(1),
        unit: z.string({ message: 'Unit is required' }).min(1),
        price: z.number({ message: 'Price is required' }).min(0),
    }),
});

const updateLabTestValidationSchema = z.object({
    body: z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        category: z.enum([...TestCategories] as [string, ...string[]]).optional(),
        sampleType: z.enum([...SampleTypes] as [string, ...string[]]).optional(),
        normalRange: z.string().optional(),
        unit: z.string().optional(),
        price: z.number().optional(),
    }),
});

const createLabRequestValidationSchema = z.object({
    body: z.object({
        patientId: z.string({ message: 'Patient ID is required' }),
        doctorId: z.string({ message: 'Doctor ID is required' }),
        tests: z.array(z.string()).min(1, 'At least one test is required'),
        requestDate: z.string().datetime(),
        notes: z.string().optional(),
    }),
});

const updateLabRequestStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...RequestStatuses] as [string, ...string[]]),
    }),
});

const createLabResultValidationSchema = z.object({
    body: z.object({
        requestId: z.string({ message: 'Request ID is required' }),
        testId: z.string({ message: 'Test ID is required' }),
        resultValue: z.string({ message: 'Result value is required' }).min(1),
        normalRange: z.string({ message: 'Normal range is required' }).min(1),
        remarks: z.string().optional(),
        technicianId: z.string({ message: 'Technician ID is required' }),
        resultDate: z.string().datetime(),
    }),
});

export const LaboratoryValidations = {
    createLabTestValidationSchema,
    updateLabTestValidationSchema,
    createLabRequestValidationSchema,
    updateLabRequestStatusValidationSchema,
    createLabResultValidationSchema,
};
