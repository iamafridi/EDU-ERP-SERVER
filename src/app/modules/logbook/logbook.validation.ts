import { z } from 'zod';
import { ProcedureCategories, CompetencyLevels } from './logbook.constant';

const createClinicalProcedureValidationSchema = z.object({
    body: z.object({
        code: z.string({ message: 'Code is required' }).min(1),
        name: z.string({ message: 'Name is required' }).min(1),
        category: z.enum([...ProcedureCategories] as [string, ...string[]]),
        minimumRequired: z.number({ message: 'Minimum required is required' }).min(1),
        description: z.string().optional(),
    }),
});

const updateClinicalProcedureValidationSchema = z.object({
    body: z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        category: z.enum([...ProcedureCategories] as [string, ...string[]]).optional(),
        minimumRequired: z.number().optional(),
        description: z.string().optional(),
    }),
});

const createLogEntryValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        procedure: z.string({ message: 'Procedure ID is required' }),
        patientAge: z.number({ message: 'Patient age is required' }).min(0).max(150),
        patientGender: z.string({ message: 'Patient gender is required' }).min(1),
        diagnosis: z.string({ message: 'Diagnosis is required' }).min(1),
        date: z.string().datetime(),
        supervisor: z.string({ message: 'Supervisor ID is required' }),
        supervisorSignOff: z.boolean().optional().default(false),
        competency: z.enum([...CompetencyLevels] as [string, ...string[]]),
        notes: z.string().optional(),
    }),
});

const updateLogEntryValidationSchema = z.object({
    body: z.object({
        patientAge: z.number().optional(),
        patientGender: z.string().optional(),
        diagnosis: z.string().optional(),
        date: z.string().datetime().optional(),
        supervisorSignOff: z.boolean().optional(),
        competency: z.enum([...CompetencyLevels] as [string, ...string[]]).optional(),
        notes: z.string().optional(),
    }),
});

export const LogbookValidations = {
    createClinicalProcedureValidationSchema,
    updateClinicalProcedureValidationSchema,
    createLogEntryValidationSchema,
    updateLogEntryValidationSchema,
};
