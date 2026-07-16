import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TBaseProfile = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  contactNo: string;
  profileImg?: string;
  isDeleted: boolean;
};
