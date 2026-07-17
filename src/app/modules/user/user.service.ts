import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    await User.findByIdAndUpdate(
      newUser[0]._id,
      { profileRef: newStudent[0]._id, profileType: 'Student' },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    const populatedStudent = await Student.findById(newStudent[0]._id)
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      })
      .populate({
        path: 'user',
        select: '-password',
      });

    return populatedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await User.findByIdAndUpdate(
      newUser[0]._id,
      { profileRef: newFaculty[0]._id, profileType: 'Faculty' },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    const populatedFaculty = await Faculty.findById(newFaculty[0]._id)
      .populate('academicDepartment')
      .populate({
        path: 'user',
        select: '-password',
      });

    return populatedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'domain-admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await User.findByIdAndUpdate(
      newUser[0]._id,
      { profileRef: newAdmin[0]._id, profileType: 'Admin' },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    const populatedAdmin = await Admin.findById(newAdmin[0]._id).populate({
      path: 'user',
      select: '-password',
    });

    return populatedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    User.find().populate('profileRef').select('-password'),
    query,
  )
    .search(['email', 'role', 'id'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { data, meta };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
    .populate('profileRef')
    .select('-password');

  return result;
};

const updateUserInDB = async (userId: string, payload: Record<string, unknown>) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const allowedFields: Record<string, unknown> = {};
  const allowedKeys = ['role', 'domainAdminType', 'staffCategory', 'staffSubRole', 'status'];

  for (const key of allowedKeys) {
    if (payload[key] !== undefined) {
      allowedFields[key] = payload[key];
    }
  }

  if (Object.keys(allowedFields).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No valid fields to update');
  }

  const updatedUser = await User.findByIdAndUpdate(userId, allowedFields, {
    new: true,
    runValidators: true,
  })
    .populate('profileRef')
    .select('-password');

  return updatedUser;
};

const deleteUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  await User.findByIdAndUpdate(userId, { isDeleted: true });

  return null;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
