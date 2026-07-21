import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CommitteeSearchableFields } from './committee.constant';
import { TCommittee } from './committee.interface';
import { Committee } from './committee.model';

const createCommitteeIntoDB = async (payload: TCommittee) => {
    const result = await Committee.create(payload);
    return result;
};

const getAllCommitteesFromDB = async (query: Record<string, unknown>) => {
    const committeeQuery = new QueryBuilder(
        Committee.find().populate('members.member convenor'),
        query,
    )
        .search(CommitteeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await committeeQuery.modelQuery;
    const meta = await committeeQuery.countTotal();
    return { data, meta };
};

const getSingleCommitteeFromDB = async (id: string) => {
    const result = await Committee.findById(id).populate('members.member convenor');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Committee not found');
    return result;
};

const updateCommitteeIntoDB = async (id: string, payload: Partial<TCommittee>) => {
    const result = await Committee.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Committee not found');
    return result;
};

const deleteCommitteeFromDB = async (id: string) => {
    const result = await Committee.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Committee not found');
    return result;
};

export const CommitteeServices = {
    createCommitteeIntoDB,
    getAllCommitteesFromDB,
    getSingleCommitteeFromDB,
    updateCommitteeIntoDB,
    deleteCommitteeFromDB,
};
