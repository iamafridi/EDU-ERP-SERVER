import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ParentSearchableFields } from './parent.constant';
import { TParent } from './parent.interface';
import { Parent } from './parent.model';

const createParentIntoDB = async (payload: TParent) => {
    const result = await Parent.create(payload);
    return result;
};

const getAllParentsFromDB = async (query: Record<string, unknown>) => {
    const parentQuery = new QueryBuilder(
        Parent.find().populate('children'),
        query,
    )
        .search(ParentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await parentQuery.modelQuery;
    const meta = await parentQuery.countTotal();
    return { data, meta };
};

const getSingleParentFromDB = async (id: string) => {
    const result = await Parent.findById(id).populate('children');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Parent not found');
    return result;
};

const getParentByUserFromDB = async (userId: string) => {
    const result = await Parent.findOne({ user: userId }).populate('children');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Parent profile not found');
    return result;
};

const updateParentIntoDB = async (id: string, payload: Partial<TParent>) => {
    const result = await Parent.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate('children');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Parent not found');
    return result;
};

const deleteParentFromDB = async (id: string) => {
    const result = await Parent.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Parent not found');
    return result;
};

export const ParentServices = {
    createParentIntoDB,
    getAllParentsFromDB,
    getSingleParentFromDB,
    getParentByUserFromDB,
    updateParentIntoDB,
    deleteParentFromDB,
};
