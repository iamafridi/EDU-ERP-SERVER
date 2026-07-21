import { Types } from 'mongoose';

export type TAlumni = {
    user?: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    batch: string;
    department: Types.ObjectId;
    graduationYear: number;
    currentEmployer?: string;
    currentPosition?: string;
    address?: string;
    photo?: string;
    isDeleted: boolean;
};

export type TAlumniEvent = {
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: Types.ObjectId;
    attendees: Types.ObjectId[];
    maxAttendees?: number;
    isDeleted: boolean;
};

export type TAlumniDonation = {
    alumni: Types.ObjectId;
    amount: number;
    currency: string;
    purpose: string;
    donationDate: Date;
    paymentMethod: string;
    isDeleted: boolean;
};
