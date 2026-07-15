import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import type { TDomainAdminType, TStaffSubRole } from '../../shared/roles';

declare global {
  namespace Express {
    interface Request {
      user: {
        uid: string;
        email: string;
        role: TUserRole;
        domainAdminType?: TDomainAdminType;
        staffSubRole?: TStaffSubRole;
        userId: string;
        profileId: string;
        profileType: string;
        isDemo?: boolean;
      };
    }
  }
}
