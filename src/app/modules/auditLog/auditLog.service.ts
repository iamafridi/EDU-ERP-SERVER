import httpStatus from 'http-status';
import { FilterQuery } from 'mongoose';
import { AuditLog, IAuditLog } from './auditLog.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const auditLogSearchableFields = ['resource', 'resourceId'];

const getAuditLogsFromDB = async (query: Record<string, unknown>) => {
  const { startDate, endDate, ...rest } = query;

  const dateFilter: FilterQuery<IAuditLog> = {};
  if (startDate) {
    dateFilter.$gte = new Date(startDate as string);
  }
  if (endDate) {
    dateFilter.$lte = new Date(endDate as string);
  }

  const baseQuery: Record<string, unknown> = {};
  if (Object.keys(dateFilter).length) {
    baseQuery.timestamp = dateFilter;
  }

  const auditLogQuery = new QueryBuilder(
    AuditLog.find(baseQuery as FilterQuery<IAuditLog>),
    rest,
  )
    .search(auditLogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const logs = await auditLogQuery.modelQuery;
  const meta = await auditLogQuery.countTotal();

  return { logs, meta };
};

const getSingleAuditLog = async (id: string) => {
  const result = await AuditLog.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Audit log not found');
  }

  return result;
};

export const AuditLogServices = {
  getAuditLogsFromDB,
  getSingleAuditLog,
};
