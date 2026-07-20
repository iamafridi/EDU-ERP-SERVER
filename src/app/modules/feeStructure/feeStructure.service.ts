import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { FeeStructureSearchableFields } from './feeStructure.constant';
import { TFeeStructure } from './feeStructure.interface';
import { FeeStructure } from './feeStructure.model';

const createFeeStructureIntoDB = async (payload: TFeeStructure) => {
    const result = await FeeStructure.create(payload);
    return result;
};

const getAllFeeStructuresFromDB = async (query: Record<string, unknown>) => {
    const feeStructureQuery = new QueryBuilder(
        FeeStructure.find().populate('academicSemester'),
        query,
    )
        .search(FeeStructureSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await feeStructureQuery.modelQuery;
    const meta = await feeStructureQuery.countTotal();
    return { data, meta };
};

const getSingleFeeStructureFromDB = async (id: string) => {
    const result = await FeeStructure.findById(id).populate('academicSemester');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee structure not found');
    return result;
};

const updateFeeStructureIntoDB = async (id: string, payload: Partial<TFeeStructure>) => {
    const result = await FeeStructure.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee structure not found');
    return result;
};

const deleteFeeStructureFromDB = async (id: string) => {
    const result = await FeeStructure.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Fee structure not found');
    return result;
};

export const FeeStructureServices = {
    createFeeStructureIntoDB,
    getAllFeeStructuresFromDB,
    getSingleFeeStructureFromDB,
    updateFeeStructureIntoDB,
    deleteFeeStructureFromDB,
};
