import { Types } from 'mongoose';

export type TPharmacist = {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  contactNo: string;
  licenseNumber?: string;
  qualification?: string;
  profileImg?: string;
  isDeleted: boolean;
};
