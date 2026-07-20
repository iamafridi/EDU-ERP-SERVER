import { Schema, model } from 'mongoose';
import { TOPDAppointment, TOPDVisit } from './opd.interface';
import { AppointmentStatuses } from './opd.constant';

const opdAppointmentSchema = new Schema<TOPDAppointment>(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        appointmentDate: { type: Date, required: true },
        timeSlot: { type: String, required: true, trim: true },
        chiefComplaint: { type: String, required: true, trim: true, select: false },
        status: { type: String, enum: AppointmentStatuses, default: 'scheduled' },
        notes: { type: String, trim: true, select: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

opdAppointmentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
opdAppointmentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const opdVisitSchema = new Schema<TOPDVisit>(
    {
        appointmentId: { type: Schema.Types.ObjectId, ref: 'OPDAppointment', required: true },
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
        symptoms: { type: String, required: true, trim: true },
        diagnosis: { type: String, required: true, trim: true, select: false },
        investigations: { type: String, trim: true },
        prescription: { type: String, trim: true, select: false },
        followUpDate: { type: Date },
        notes: { type: String, trim: true, select: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

opdVisitSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
opdVisitSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const OPDAppointment = model<TOPDAppointment>('OPDAppointment', opdAppointmentSchema);
export const OPDVisit = model<TOPDVisit>('OPDVisit', opdVisitSchema);
