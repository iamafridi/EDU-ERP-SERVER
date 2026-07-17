import { DOMAIN_ADMIN_TYPES, STAFF_CATEGORIES, STAFF_SUB_ROLES } from '../../../shared/roles';

export const USER_ROLE_ENUM = [
  'super-admin', 'domain-admin', 'faculty', 'student', 'staff',
] as const;

export const USER_STATUS_ENUM = ['active', 'blocked', 'pending'] as const;

export const UserSearchableFields = ['email', 'id', 'role'];

export const UserFilterableFields = ['searchTerm', 'email', 'role', 'status'];
