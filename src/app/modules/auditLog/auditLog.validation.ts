import { z } from 'zod';

export const getAuditLogsValidationSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    action: z.enum(['CREATE', 'UPDATE', 'DELETE']).optional(),
    resource: z.string().optional(),
    userId: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    searchTerm: z.string().optional(),
    sort: z.string().optional(),
    fields: z.string().optional(),
  }),
});

export const auditLogValidations = {
  getAuditLogsValidationSchema,
};
