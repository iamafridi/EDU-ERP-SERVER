import { Types } from 'mongoose';

export type TAppointmentStatus = 'scheduled' | 'checked-in' | 'consulted' | 'cancelled';

export type TOPDAppointment = {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    appointmentDate: Date;
    timeSlot: string;
    chiefComplaint: string;
    status: TAppointmentStatus;
    notes?: string;
    isDeleted: boolean;
};

export type TOPDVisit = {
    appointmentId: Types.ObjectId;
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    symptoms: string;
    diagnosis: string;
    investigations?: string;
    prescription?: string;
    followUpDate?: Date;
    notes?: string;
    isDeleted: boolean;
};
