import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { HealthCenterSearchableFields } from './healthCenter.constant';
import { THealthCenter } from './healthCenter.interface';
import { HealthCenter } from './healthCenter.model';

const createHealthCenterIntoDB = async (payload: THealthCenter) => {
    const result = await HealthCenter.create(payload);
    return result;
};

const getAllHealthCentersFromDB = async (query: Record<string, unknown>) => {
    const healthQuery = new QueryBuilder(
        HealthCenter.find().populate('student doctor'),
        query,
    )
        .search(HealthCenterSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await healthQuery.modelQuery;
    const meta = await healthQuery.countTotal();
    return { data, meta };
};

const getSingleHealthCenterFromDB = async (id: string) => {
    const result = await HealthCenter.findById(id).populate('student doctor');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Health center record not found');
    return result;
};

const updateHealthCenterIntoDB = async (id: string, payload: Partial<THealthCenter>) => {
    const result = await HealthCenter.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Health center record not found');
    return result;
};

const deleteHealthCenterFromDB = async (id: string) => {
    const result = await HealthCenter.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Health center record not found');
    return result;
};

export const HealthCenterServices = {
    createHealthCenterIntoDB,
    getAllHealthCentersFromDB,
    getSingleHealthCenterFromDB,
    updateHealthCenterIntoDB,
    deleteHealthCenterFromDB,
};
