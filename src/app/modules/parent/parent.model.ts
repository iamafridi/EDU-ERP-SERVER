import { Schema, model } from 'mongoose';
import { TParent } from './parent.interface';

const nameSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    { _id: false },
);

const parentSchema = new Schema<TParent>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        name: { type: nameSchema, required: true },
        email: { type: String, required: true, trim: true },
        contactNo: { type: String, required: true, trim: true },
        children: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
        address: { type: String, trim: true },
        occupation: { type: String, trim: true },
        profileImg: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

parentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
parentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Parent = model<TParent>('Parent', parentSchema);
