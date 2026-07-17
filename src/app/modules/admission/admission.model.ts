import { Schema, model } from 'mongoose';
import { TAdmissionApplication, TMeritList } from './admission.interface';
import { ApplicationStatus, Gender } from './admission.constant';

const documentSchema = new Schema(
    { name: { type: String, required: true }, url: { type: String, required: true } },
    { _id: false },
);

const admissionApplicationSchema = new Schema<TAdmissionApplication>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: Gender, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true },
        previousSchool: { type: String, trim: true },
        previousGrade: { type: String, trim: true },
        applyingFor: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
        academicYear: { type: String, required: true },
        documents: { type: [documentSchema], default: [] },
        status: { type: String, enum: ApplicationStatus, default: 'draft' },
        reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        reviewNotes: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

admissionApplicationSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
admissionApplicationSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const meritListSchema = new Schema<TMeritList>(
    {
        application: { type: Schema.Types.ObjectId, ref: 'AdmissionApplication', required: true, unique: true },
        rank: { type: Number, required: true },
        meritScore: { type: Number, required: true },
        category: { type: String, required: true },
        isAllotted: { type: Boolean, default: false },
        allottedSeat: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

meritListSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
meritListSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const AdmissionApplication = model<TAdmissionApplication>(
    'AdmissionApplication',
    admissionApplicationSchema,
);
export const MeritList = model<TMeritList>('MeritList', meritListSchema);
