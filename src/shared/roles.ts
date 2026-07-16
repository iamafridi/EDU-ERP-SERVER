export type TRole =
  | 'super-admin'
  | 'domain-admin'
  | 'faculty'
  | 'student'
  | 'staff';

export type TDomainAdminType =
  | 'faculty-admin'
  | 'finance-admin'
  | 'medical-admin'
  | 'staff-admin';

export type TStaffCategory =
  | 'medical'
  | 'finance'
  | 'security'
  | 'facility'
  | 'library'
  | 'frontdesk'
  | 'mess';

export type TStaffSubRole =
  | 'doctor'
  | 'nurse'
  | 'lab-technician'
  | 'pharmacist'
  | 'accountant'
  | 'guard'
  | 'warden'
  | 'maintenance'
  | 'librarian'
  | 'receptionist'
  | 'counselor'
  | 'mess-manager';

export const DOMAIN_ADMIN_TYPES: TDomainAdminType[] = [
  'faculty-admin',
  'finance-admin',
  'medical-admin',
  'staff-admin',
];

export const STAFF_CATEGORIES: TStaffCategory[] = [
  'medical',
  'finance',
  'security',
  'facility',
  'library',
  'frontdesk',
  'mess',
];

export const STAFF_SUB_ROLES: TStaffSubRole[] = [
  'doctor',
  'nurse',
  'lab-technician',
  'pharmacist',
  'accountant',
  'guard',
  'warden',
  'maintenance',
  'librarian',
  'receptionist',
  'counselor',
  'mess-manager',
];

export const STAFF_CATEGORY_ROLES: Record<TStaffCategory, TStaffSubRole[]> = {
  medical: ['doctor', 'nurse', 'lab-technician', 'pharmacist'],
  finance: ['accountant'],
  security: ['guard', 'warden'],
  facility: ['maintenance'],
  library: ['librarian'],
  frontdesk: ['receptionist', 'counselor'],
  mess: ['mess-manager'],
};

export const ROLE_HIERARCHY: TRole[] = [
  'super-admin',
  'domain-admin',
  'faculty',
  'staff',
  'student',
];

export function getRoleRank(role: TRole): number {
  const idx = ROLE_HIERARCHY.indexOf(role);
  return idx === -1 ? 999 : idx;
}
