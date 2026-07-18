import { Types } from 'mongoose';

export type TDoctor = {
  id: string;
  user: Types.ObjectId;
  name: { firstName: string; middleName?: string; lastName: string };
  email: string;
  contactNo: string;
  specialization?: string;
  licenseNumber?: string;
  profileImg?: string;
  isDeleted: boolean;
};
