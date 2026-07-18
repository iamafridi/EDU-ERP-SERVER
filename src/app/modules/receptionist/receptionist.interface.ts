import { Types } from 'mongoose';

export type TReceptionist = {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  contactNo: string;
  department?: string;
  shift?: 'day' | 'night' | 'rotating';
  profileImg?: string;
  isDeleted: boolean;
};
