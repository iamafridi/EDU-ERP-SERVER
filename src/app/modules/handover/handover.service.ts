import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { HandoverSearchableFields } from './handover.constant';
import { THandover } from './handover.interface';
import { Handover } from './handover.model';

const createHandoverIntoDB = async (payload: THandover) => {
    const result = await Handover.create(payload);
    return result;
};

const getAllHandoversFromDB = async (query: Record<string, unknown>) => {
    const handoverQuery = new QueryBuilder(
        Handover.find().populate('fromGuard toGuard'),
        query,
    )
        .search(HandoverSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await handoverQuery.modelQuery;
    const meta = await handoverQuery.countTotal();
    return { data, meta };
};

const getSingleHandoverFromDB = async (id: string) => {
    const result = await Handover.findById(id).populate('fromGuard toGuard');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Handover not found');
    }
    return result;
};

const updateHandoverIntoDB = async (id: string, payload: Partial<THandover>) => {
    const result = await Handover.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Handover not found');
    }
    return result;
};

const deleteHandoverFromDB = async (id: string) => {
    const result = await Handover.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Handover not found');
    }
    return result;
};

export const HandoverServices = {
    createHandoverIntoDB,
    getAllHandoversFromDB,
    getSingleHandoverFromDB,
    updateHandoverIntoDB,
    deleteHandoverFromDB,
};
