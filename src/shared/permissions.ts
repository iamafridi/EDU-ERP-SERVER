import { TRole, TDomainAdminType, TStaffSubRole } from './roles';

export type TPermission = 'create' | 'read' | 'update' | 'delete' | 'approve';

export type TModulePermission = {
  roles: TRole[];
  domainAdminTypes?: TDomainAdminType[];
  staffSubRoles?: TStaffSubRole[];
  selfOnly?: boolean;
  permissions: TPermission[];
};

export const MODULE_PERMISSIONS: Record<string, TModulePermission> = {
  // ── Academic ──
  user: {
    roles: ['super-admin', 'domain-admin'],
    permissions: ['read', 'update', 'delete'],
  },
  student: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update', 'delete'],
  },
  faculty: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update', 'delete'],
  },
  course: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },
  semester: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },
  enrollment: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'delete'],
  },
  timetable: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },
  attendance: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },
  grade: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },
  exam: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    domainAdminTypes: ['faculty-admin'],
    permissions: ['create', 'read', 'update'],
  },

  // ── Student-scoped (student sees own) ──
  'fee.student': {
    roles: ['super-admin', 'domain-admin', 'student'],
    domainAdminTypes: ['finance-admin'],
    permissions: ['read'],
    selfOnly: true,
  },
  'receipt.student': {
    roles: ['super-admin', 'domain-admin', 'student'],
    domainAdminTypes: ['finance-admin'],
    permissions: ['read'],
    selfOnly: true,
  },

  // ── Finance ──
  fee: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read', 'update'],
  },
  receipt: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read', 'update'],
  },
  payroll: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read', 'update'],
  },
  expense: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read', 'update'],
  },
  scholarship: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read', 'update'],
  },
  'financial-report': {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['finance-admin'],
    staffSubRoles: ['accountant'],
    permissions: ['create', 'read'],
  },

  // ── Medical ──
  'health-center': {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['medical-admin'],
    staffSubRoles: ['doctor', 'nurse'],
    permissions: ['create', 'read', 'update'],
  },
  opd: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['medical-admin'],
    staffSubRoles: ['doctor', 'nurse', 'receptionist'],
    permissions: ['create', 'read', 'update'],
  },
  ipd: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['medical-admin'],
    staffSubRoles: ['doctor', 'nurse', 'receptionist'],
    permissions: ['create', 'read', 'update'],
  },
  laboratory: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['medical-admin'],
    staffSubRoles: ['doctor', 'lab-technician', 'nurse'],
    permissions: ['create', 'read', 'update'],
  },
  pharmacy: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['medical-admin'],
    staffSubRoles: ['doctor', 'pharmacist', 'nurse'],
    permissions: ['create', 'read', 'update'],
  },

  // ── Staff-managed ──
  'gate-entry': {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['guard', 'warden'],
    permissions: ['create', 'read', 'update'],
  },
  'visitor-log': {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['guard', 'warden'],
    permissions: ['create', 'read'],
  },
  incident: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['guard', 'warden', 'maintenance'],
    permissions: ['create', 'read', 'update'],
  },
  maintenance: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['maintenance'],
    permissions: ['read', 'update'],
  },
  hostel: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['warden'],
    permissions: ['create', 'read', 'update'],
  },
  transport: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    permissions: ['create', 'read', 'update'],
  },
  mess: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['mess-manager'],
    permissions: ['create', 'read', 'update'],
  },

  // ── Library ──
  library: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['librarian'],
    permissions: ['create', 'read', 'update'],
  },
  book: {
    roles: ['super-admin', 'domain-admin'],
    domainAdminTypes: ['staff-admin'],
    staffSubRoles: ['librarian'],
    permissions: ['create', 'read', 'update', 'delete'],
  },

  // ── Communication ──
  notice: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    permissions: ['create', 'read', 'update'],
  },
  notification: {
    roles: ['super-admin', 'domain-admin', 'faculty'],
    permissions: ['create', 'read'],
  },
  grievance: {
    roles: ['super-admin', 'domain-admin', 'faculty', 'staff', 'student'],
    permissions: ['create', 'read', 'update'],
    selfOnly: true,
  },
  leave: {
    roles: ['super-admin', 'domain-admin', 'faculty', 'staff', 'student'],
    permissions: ['create', 'read', 'approve'],
    selfOnly: true,
  },

  // ── Student-only modules ──
  logbook: {
    roles: ['super-admin', 'domain-admin', 'faculty', 'student'],
    domainAdminTypes: ['medical-admin', 'faculty-admin'],
    permissions: ['create', 'read', 'update'],
    selfOnly: true,
  },
  alumni: {
    roles: ['super-admin', 'domain-admin', 'faculty', 'student'],
    permissions: ['create', 'read'],
  },
};

export function canAccess(
  role: TRole,
  domainAdminType: TDomainAdminType | undefined,
  staffSubRole: TStaffSubRole | undefined,
  module: string,
  permission: TPermission,
): boolean {
  const config = MODULE_PERMISSIONS[module];
  if (!config) return false;

  if (role === 'super-admin') return true;

  if (role === 'domain-admin') {
    if (!domainAdminType) return false;
    if (config.domainAdminTypes && !config.domainAdminTypes.includes(domainAdminType)) return false;
    return config.permissions.includes(permission);
  }

  if (role === 'staff') {
    if (!staffSubRole) return false;
    if (config.staffSubRoles && !config.staffSubRoles.includes(staffSubRole)) return false;
    return config.permissions.includes(permission);
  }

  if (role === 'faculty') {
    if (!config.roles.includes('faculty')) return false;
    return config.permissions.includes(permission);
  }

  if (role === 'student') {
    if (!config.roles.includes('student')) return false;
    if (config.selfOnly) return permission === 'read';
    return config.permissions.includes(permission);
  }

  return false;
}
