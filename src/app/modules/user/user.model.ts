import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import {
  DOMAIN_ADMIN_TYPES,
  STAFF_CATEGORIES,
  STAFF_SUB_ROLES,
} from '../../../shared/roles';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'domain-admin', 'faculty', 'student', 'staff'],
      required: true,
    },
    domainAdminType: {
      type: String,
      enum: DOMAIN_ADMIN_TYPES,
    },
    staffCategory: {
      type: String,
      enum: STAFF_CATEGORIES,
    },
    staffSubRole: {
      type: String,
      enum: STAFF_SUB_ROLES,
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'pending'],
      default: 'pending',
    },
    profileRef: {
      type: Schema.Types.ObjectId,
      refPath: 'profileType',
    },
    profileType: {
      type: String,
      enum: ['Student', 'Faculty', 'DomainAdmin', 'Staff'],
    },
    lastLogin: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
