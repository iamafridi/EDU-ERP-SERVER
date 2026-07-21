import { AuditLogServices } from './auditLog.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAuditLogs = catchAsync(async (req, res) => {
  const query = req.query;
  const { logs, meta } = await AuditLogServices.getAuditLogsFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Audit logs retrieved successfully',
    meta,
    data: logs,
  });
});

const getSingleAuditLog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AuditLogServices.getSingleAuditLog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Audit log retrieved successfully',
    data: result,
  });
});

export const AuditLogControllers = {
  getAuditLogs,
  getSingleAuditLog,
};
