import { Schema, model } from 'mongoose';
import { TEmployee } from './employee.interface';
import { EmploymentTypes } from './employee.constant';

const employeeSchema = new Schema<TEmployee>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        employeeId: { type: String, required: true, unique: true, trim: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, trim: true },
        department: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment' },
        designation: { type: String, required: true, trim: true },
        employmentType: { type: String, enum: EmploymentTypes, required: true },
        joiningDate: { type: Date, required: true },
        salary: { type: Number, min: 0 },
        address: { type: String, trim: true },
        photo: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

employeeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
employeeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Employee = model<TEmployee>('Employee', employeeSchema);
