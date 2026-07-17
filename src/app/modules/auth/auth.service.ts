import httpStatus from 'http-status';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserRole } from '../user/user.interface';
import { JwtHelpers } from '../../utils/jwt';

const getMeFromDB = async (userId: string) => {
  const user = await User.findById(userId)
    .populate('profileRef')
    .select('-password');

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return user;
};

const loginUserFromDB = async (payload: { email: string; password: string; role: TUserRole }) => {
  const user = await User.findOne({ email: payload.email }).populate('profileRef').select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found. Please register first.');
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password.');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account has been deleted');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This account has been blocked');
  }

  if (payload.role && user.role !== payload.role) {
    throw new AppError(httpStatus.UNAUTHORIZED, `Access denied. You do not have the ${payload.role} role.`);
  }

  await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

  const tokenPayload = {
    uid: user.firebaseUid,
    email: user.email,
    role: user.role,
    domainAdminType: user.domainAdminType,
    staffSubRole: user.staffSubRole,
    userId: user._id.toString(),
    profileId: user.profileRef?._id?.toString() || '',
    profileType: user.profileType || '',
  };

  const token = JwtHelpers.signToken(tokenPayload);

  const profileRef = user.profileRef ? (user.profileRef as unknown as Record<string, unknown>) : null;
  const profileName = profileRef?.name
    ? typeof profileRef.name === 'object'
      ? `${(profileRef.name as Record<string, string>)?.firstName || ''} ${(profileRef.name as Record<string, string>)?.lastName || ''}`.trim()
      : String(profileRef.name)
    : '';

  return {
    token,
    profile: {
      id: user.id,
      name: profileName || user.email?.split('@')[0] || '',
      email: user.email,
      role: user.role,
      firebaseUid: user.firebaseUid,
      isDemo: user.isDemo || false,
    },
  };
};

const updateProfileInDB = async (userId: string, payload: { name?: string; phone?: string; avatar?: string }) => {
  const user = await User.findById(userId).populate('profileRef');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const profileRef = user.profileRef as unknown as Record<string, unknown> | null;
  if (payload.name && profileRef && profileRef._id) {
    const parts = payload.name.trim().split(' ');
    const update: Record<string, string> = {
      'name.firstName': parts[0] || '',
      'name.lastName': parts.slice(1).join(' ') || '',
    };
    try {
      const Model = mongoose.model(user.profileType || 'User');
      await Model.findByIdAndUpdate(profileRef._id, update);
    } catch {
      const Model = mongoose.model('User');
      await Model.findByIdAndUpdate(user._id, { name: payload.name });
    }
  }

  if (payload.phone && profileRef && profileRef._id) {
    try {
      const Model = mongoose.model(user.profileType || 'User');
      await Model.findByIdAndUpdate(profileRef._id, { contactNo: payload.phone });
    } catch {
    }
  }

  return { message: 'Profile updated successfully' };
};

export const AuthServices = {
  getMeFromDB,
  loginUserFromDB,
  updateProfileInDB,
};
