import { TUserRole, TUserStatus } from '../user/user.interface';

export type TAuthRegister = {
  idToken: string;
  role: TUserRole;
  profileData?: Record<string, unknown>;
};

export type TAuthInvite = {
  email: string;
  role: Exclude<TUserRole, 'super-admin'>;
  department?: string;
};

export type TAuthMe = {
  uid: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  userId: string;
  profileId: string;
  profileType: string;
  profile: Record<string, unknown> | null;
};

export type TLoginPayload = {
  idToken: string;
  role: TUserRole;
};
