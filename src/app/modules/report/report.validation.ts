import { z } from 'zod';
import { ReportFormats } from './report.constant';

const createReportValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Name is required' }).min(1),
        type: z.enum([...ReportFormats] as [string, ...string[]]),
        query: z.record(z.string(), z.any()).optional(),
    }),
});

export const ReportValidations = {
    createReportValidationSchema,
};
