import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

interface ScopeMapping {
  field: string;
  idField: 'profileId' | 'userId';
}

const STUDENT_SCOPED_FIELDS: Record<string, ScopeMapping> = {
  fee:                 { field: 'student',   idField: 'profileId' },
  receipt:             { field: 'student',   idField: 'profileId' },
  attendance:          { field: 'student',   idField: 'profileId' },
  grade:               { field: 'student',   idField: 'profileId' },
  hostel:              { field: 'student',   idField: 'profileId' },
  'health-center':     { field: 'student',   idField: 'profileId' },
  'meal-plan':         { field: 'student',   idField: 'profileId' },
  'meal-feedback':     { field: 'student',   idField: 'profileId' },
  'mess-bill':         { field: 'student',   idField: 'profileId' },
  library:             { field: 'borrower',  idField: 'profileId' },
  payment:             { field: 'student',   idField: 'profileId' },
  transcript:          { field: 'student',   idField: 'profileId' },
  grievance:           { field: 'complainant',  idField: 'userId' },
  incident:            { field: 'reportedBy',   idField: 'userId' },
  'maintenance-complaint': { field: 'reportedBy', idField: 'userId' },
};

export function scopeQuery(
  req: Request,
  query: Record<string, unknown>,
  moduleKey?: string,
): Record<string, unknown> {
  if (!req.user) return query;

  if (req.user.role === 'student') {
    const mapping = moduleKey ? STUDENT_SCOPED_FIELDS[moduleKey] : undefined;
    if (!mapping) return query;
    const idValue = mapping.idField === 'userId' ? req.user.userId : req.user.profileId;
    return { ...query, [mapping.field]: idValue };
  }

  return query;
}

const STUDENT_OWNERSHIP: Record<string, { field: string; idField: 'profileId' | 'userId' }> = {
  fee:                 { field: 'student',   idField: 'profileId' },
  receipt:             { field: 'student',   idField: 'profileId' },
  grade:               { field: 'student',   idField: 'profileId' },
  hostel:              { field: 'student',   idField: 'profileId' },
  'health-center':     { field: 'student',   idField: 'profileId' },
  library:             { field: 'borrower',  idField: 'profileId' },
  'mess-bill':         { field: 'student',   idField: 'profileId' },
  'meal-plan':         { field: 'student',   idField: 'profileId' },
  payment:             { field: 'student',   idField: 'profileId' },
  transcript:          { field: 'student',   idField: 'profileId' },
  incident:            { field: 'reportedBy',   idField: 'userId' },
  grievance:           { field: 'complainant',  idField: 'userId' },
  'maintenance-complaint': { field: 'reportedBy', idField: 'userId' },
};

export function assertOwnership(
  req: Request,
  record: any,
  moduleKey: string,
): void {
  if (!req.user) return;

  if (req.user.role === 'student') {
    const mapping = STUDENT_OWNERSHIP[moduleKey];
    if (!mapping) return;
    const expectedId = mapping.idField === 'userId' ? req.user.userId : req.user.profileId;
    const actualOwner = record?.[mapping.field];
    if (actualOwner?.toString() !== expectedId) {
      throw new AppError(httpStatus.FORBIDDEN, 'Access denied');
    }
  }

}
