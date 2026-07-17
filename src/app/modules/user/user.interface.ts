import { Types } from 'mongoose';
import type { TRole, TDomainAdminType, TStaffCategory, TStaffSubRole } from '../../../shared/roles';

export type TUserRole = TRole;

export type TUserStatus = 'active' | 'blocked' | 'pending';

export type TProfileType = 'Student' | 'Faculty' | 'DomainAdmin' | 'Staff';

export type TUser = {
  id: string;
  firebaseUid: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: TUserRole;
  domainAdminType?: TDomainAdminType;
  staffCategory?: TStaffCategory;
  staffSubRole?: TStaffSubRole;
  status: TUserStatus;
  profileRef: Types.ObjectId;
  profileType: TProfileType;
  lastLogin: Date;
  isDeleted: boolean;
  isDemo?: boolean;
};
