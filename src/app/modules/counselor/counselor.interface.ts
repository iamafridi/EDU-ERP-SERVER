import { Types } from 'mongoose';

export type TCounselor = {
  id: string;
  user: Types.ObjectId;
  name: { firstName: string; middleName?: string; lastName: string };
  email: string;
  contactNo: string;
  employeeId?: string;
  specialization?: string;
  profileImg?: string;
  isDeleted: boolean;
};
