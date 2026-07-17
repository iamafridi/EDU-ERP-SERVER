import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { Fee } from '../fee/fee.model';
import { Receipt } from '../receipt/receipt.model';
import { Attendance } from '../attendance/attendance.model';
import { Grade } from '../grade/grade.model';
import { Hostel } from '../hostel/hostel.model';
import { Library } from '../library/library.model';
import { MealPlan, MealFeedback, MessBill } from '../mess/mess.model';
import { HealthCenter } from '../healthCenter/healthCenter.model';
import { Payment } from '../payment/payment.model';
import { Transcript } from '../transcript/transcript.model';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

/* ----------------------------------------------------------------
   Get All Students
---------------------------------------------------------------- */
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return { data, meta };
};

/* ----------------------------------------------------------------
   Get Single Student
---------------------------------------------------------------- */
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return result;
};

/* ----------------------------------------------------------------
   Update Student
---------------------------------------------------------------- */
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  // Prepare update object
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  // Update
  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return result;
};

/* ----------------------------------------------------------------
   Delete Student (Soft Delete)
---------------------------------------------------------------- */
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Mark student as deleted
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;
    const studentId = deletedStudent._id;


    // Mark user as deleted
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    // Cascade soft-delete all related student records
    await Promise.all([
      Fee.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Receipt.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Attendance.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Grade.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Hostel.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Library.updateMany({ borrower: studentId }, { isDeleted: true }, { session }),
      MealPlan.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      MealFeedback.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      MessBill.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      HealthCenter.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Payment.updateMany({ student: studentId }, { isDeleted: true }, { session }),
      Transcript.updateMany({ student: studentId }, { isDeleted: true }, { session }),
    ]);

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

/* ----------------------------------------------------------------
   Export Services
---------------------------------------------------------------- */
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
