import { Schema, model } from 'mongoose';
import { TAlumni, TAlumniEvent, TAlumniDonation } from './alumni.interface';
import { DonationCurrencies } from './alumni.constant';

const alumniSchema = new Schema<TAlumni>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, trim: true },
        batch: { type: String, required: true, trim: true },
        department: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
        graduationYear: { type: Number, required: true },
        currentEmployer: { type: String, trim: true },
        currentPosition: { type: String, trim: true },
        address: { type: String, trim: true },
        photo: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

alumniSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
alumniSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const alumniEventSchema = new Schema<TAlumniEvent>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        location: { type: String, required: true, trim: true },
        organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        attendees: [{ type: Schema.Types.ObjectId, ref: 'Alumni' }],
        maxAttendees: { type: Number },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

alumniEventSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
alumniEventSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const alumniDonationSchema = new Schema<TAlumniDonation>(
    {
        alumni: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
        amount: { type: Number, required: true },
        currency: { type: String, enum: DonationCurrencies, default: 'USD' },
        purpose: { type: String, required: true, trim: true },
        donationDate: { type: Date, default: Date.now },
        paymentMethod: { type: String, required: true, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

alumniDonationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
alumniDonationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Alumni = model<TAlumni>('Alumni', alumniSchema);
export const AlumniEvent = model<TAlumniEvent>('AlumniEvent', alumniEventSchema);
export const AlumniDonation = model<TAlumniDonation>('AlumniDonation', alumniDonationSchema);
