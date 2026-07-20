import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { GateEntrySearchableFields } from './gateEntry.constant';
import { TGateEntry } from './gateEntry.interface';
import { GateEntry } from './gateEntry.model';

const createGateEntryIntoDB = async (payload: TGateEntry) => {
    const result = await GateEntry.create(payload);
    return result;
};

const getAllGateEntriesFromDB = async (query: Record<string, unknown>) => {
    const gateEntryQuery = new QueryBuilder(
        GateEntry.find().populate('student authorizedBy'),
        query,
    )
        .search(GateEntrySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await gateEntryQuery.modelQuery;
    const meta = await gateEntryQuery.countTotal();
    return { data, meta };
};

const getSingleGateEntryFromDB = async (id: string) => {
    const result = await GateEntry.findById(id).populate('student authorizedBy');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gate entry not found');
    }
    return result;
};

const updateGateEntryIntoDB = async (id: string, payload: Partial<TGateEntry>) => {
    const result = await GateEntry.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gate entry not found');
    }
    return result;
};

const deleteGateEntryFromDB = async (id: string) => {
    const result = await GateEntry.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gate entry not found');
    }
    return result;
};

export const GateEntryServices = {
    createGateEntryIntoDB,
    getAllGateEntriesFromDB,
    getSingleGateEntryFromDB,
    updateGateEntryIntoDB,
    deleteGateEntryFromDB,
};
