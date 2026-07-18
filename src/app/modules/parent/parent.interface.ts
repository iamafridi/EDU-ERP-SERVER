import { Types } from 'mongoose';

export type TParent = {
    user: Types.ObjectId;
    name: { firstName: string; middleName?: string; lastName: string };
    email: string;
    contactNo: string;
    children: Types.ObjectId[];
    address?: string;
    occupation?: string;
    profileImg?: string;
    isDeleted: boolean;
};
