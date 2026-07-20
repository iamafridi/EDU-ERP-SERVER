import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ScholarshipSearchableFields } from './scholarship.constant';
import { TScholarship } from './scholarship.interface';
import { Scholarship } from './scholarship.model';
import { Fee } from '../fee/fee.model';

const createScholarshipIntoDB = async (payload: TScholarship) => {
    const result = await Scholarship.create(payload);
    return result;
};

const getAllScholarshipsFromDB = async (query: Record<string, unknown>) => {
    const scholarshipQuery = new QueryBuilder(
        Scholarship.find().populate('student academicSemester approvedBy'),
        query,
    )
        .search(ScholarshipSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await scholarshipQuery.modelQuery;
    const meta = await scholarshipQuery.countTotal();
    return { data, meta };
};

const getSingleScholarshipFromDB = async (id: string) => {
    const result = await Scholarship.findById(id).populate(
        'student academicSemester approvedBy',
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    return result;
};

const updateScholarshipIntoDB = async (id: string, payload: Partial<TScholarship>) => {
    const result = await Scholarship.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    return result;
};

const deleteScholarshipFromDB = async (id: string) => {
    const result = await Scholarship.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    return result;
};

const approveScholarshipIntoDB = async (id: string, approvedBy: string) => {
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    if (scholarship.status !== 'pending') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Scholarship is not in pending status');
    }

    scholarship.status = 'approved';
    scholarship.approvedBy = approvedBy as any;
    await scholarship.save();

    const discount = scholarship.isPercentage
        ? scholarship.amount
        : undefined;
    const flatAmount = scholarship.isPercentage
        ? undefined
        : scholarship.amount;

    const fee = await Fee.findOne({
        student: scholarship.student,
        academicSemester: scholarship.academicSemester,
        isDeleted: false,
    });
    if (fee) {
        let discountAmount = 0;
        if (flatAmount) {
            discountAmount = flatAmount;
        } else if (discount) {
            discountAmount = (fee.totalAmount * discount) / 100;
        }
        const newDue = Math.max(0, fee.dueAmount - discountAmount);
        await Fee.findByIdAndUpdate(fee._id, { dueAmount: newDue });
    }

    return scholarship;
};

const rejectScholarshipIntoDB = async (id: string, remarks?: string) => {
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    if (scholarship.status !== 'pending') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Scholarship is not in pending status');
    }

    scholarship.status = 'rejected';
    if (remarks) scholarship.remarks = remarks;
    await scholarship.save();
    return scholarship;
};

export const ScholarshipServices = {
    createScholarshipIntoDB,
    getAllScholarshipsFromDB,
    getSingleScholarshipFromDB,
    updateScholarshipIntoDB,
    deleteScholarshipFromDB,
    approveScholarshipIntoDB,
    rejectScholarshipIntoDB,
};
