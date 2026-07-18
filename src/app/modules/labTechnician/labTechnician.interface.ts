import { Types } from 'mongoose';

export type TLabTechnician = {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  contactNo: string;
  specialization?: string;
  qualification?: string;
  profileImg?: string;
  isDeleted: boolean;
};
