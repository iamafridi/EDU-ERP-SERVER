import express from 'express';
import { AuditLogControllers } from './auditLog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin'),
  AuditLogControllers.getAuditLogs,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin'),
  AuditLogControllers.getSingleAuditLog,
);

export const AuditLogRoutes = router;
