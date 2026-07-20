import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TFee } from './fee.interface';
import { Fee } from './fee.model';
import { FeeStructure } from '../feeStructure/feeStructure.model';
import { Student } from '../student/student.model';

const generateFeeForStudentIntoDB = async (
    studentId: string,
    academicSemesterId: string,
    dueDate: Date,
) => {
    const existing = await Fee.findOne({
        student: studentId,
        academicSemester: academicSemesterId,
    });
    if (existing) {
        throw new AppError(httpStatus.CONFLICT, 'Fee already generated for this student and semester');
    }

    const heads = await FeeStructure.find({
        academicSemester: academicSemesterId,
        applicableTo: { $in: ['student'] },
        isDeleted: false,
    });

    if (heads.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'No fee structures found for this semester');
    }

    const feeHeads = heads.map((h) => ({
        head: h._id,
        amount: h.amount,
    }));
    const totalAmount = heads.reduce((sum, h) => sum + h.amount, 0);

    const fee = await Fee.create({
        student: studentId,
        academicSemester: academicSemesterId,
        totalAmount,
        paidAmount: 0,
        dueAmount: totalAmount,
        lateFee: 0,
        dueDate,
        status: 'unpaid',
        feeHeads,
    });

    return fee;
};

const getAllFeesFromDB = async (query: Record<string, unknown>) => {
    const feeQuery = new QueryBuilder(
        Fee.find().populate('student academicSemester feeHeads.head'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await feeQuery.modelQuery;
    const meta = await feeQuery.countTotal();
    return { data, meta };
};

const getSingleFeeFromDB = async (id: string) => {
    const result = await Fee.findById(id).populate('student academicSemester feeHeads.head');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee record not found');
    return result;
};

const updateFeeIntoDB = async (id: string, payload: Partial<TFee>) => {
    const result = await Fee.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee record not found');
    return result;
};

const deleteFeeFromDB = async (id: string) => {
    const result = await Fee.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee record not found');
    return result;
};

const bulkGenerateFeeIntoDB = async (
    academicSemesterId: string,
    dueDate: Date,
) => {
    const students = await Student.find({
        admissionSemester: academicSemesterId,
        isDeleted: false,
    });

    if (students.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'No students found for this semester');
    }

    const heads = await FeeStructure.find({
        academicSemester: academicSemesterId,
        applicableTo: { $in: ['student'] },
        isDeleted: false,
    });

    if (heads.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'No fee structures found for this semester');
    }

    const feeHeads = heads.map((h) => ({
        head: h._id,
        amount: h.amount,
    }));
    const totalAmount = heads.reduce((sum, h) => sum + h.amount, 0);

    let generatedCount = 0;
    let skippedCount = 0;
    const errors: { studentId: string; error: string }[] = [];

    for (const student of students) {
        try {
            const existing = await Fee.findOne({
                student: student._id,
                academicSemester: academicSemesterId,
            });
            if (existing) {
                skippedCount++;
                continue;
            }

            await Fee.create({
                student: student._id,
                academicSemester: academicSemesterId,
                totalAmount,
                paidAmount: 0,
                dueAmount: totalAmount,
                lateFee: 0,
                dueDate,
                status: 'unpaid',
                feeHeads,
            });
            generatedCount++;
        } catch (err: any) {
            errors.push({ studentId: student.id, error: err.message });
        }
    }

    return { generatedCount, skippedCount, errors, totalStudents: students.length };
};

export const FeeServices = {
    generateFeeForStudentIntoDB,
    bulkGenerateFeeIntoDB,
    getAllFeesFromDB,
    getSingleFeeFromDB,
    updateFeeIntoDB,
    deleteFeeFromDB,
};
