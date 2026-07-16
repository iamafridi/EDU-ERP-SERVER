import { Schema } from 'mongoose';

export const createProfileSchema = <T>(additionalFields: Record<string, unknown>) => {
  const schema = new Schema<T>(
    {
      id: { type: String, required: true, unique: true },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
      name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      email: { type: String, required: true, unique: true },
      contactNo: { type: String, required: true },
      profileImg: { type: String },
      isDeleted: { type: Boolean, default: false },
      ...additionalFields,
    },
    { timestamps: true },
  );

  schema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });

  schema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });

  return schema;
};
