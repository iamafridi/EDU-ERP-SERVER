import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TLaundryRequest } from './laundry.interface';
import { Laundry } from './laundry.model';

const createLaundryIntoDB = async (payload: TLaundryRequest) => {
    const result = await Laundry.create(payload);
    return result;
};

const getAllLaundryFromDB = async (query: Record<string, unknown>) => {
    const laundryQuery = new QueryBuilder(
        Laundry.find().populate('student'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await laundryQuery.modelQuery;
    const meta = await laundryQuery.countTotal();
    return { data, meta };
};

const getSingleLaundryFromDB = async (id: string) => {
    const result = await Laundry.findById(id).populate('student');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Laundry request not found');
    return result;
};

const updateLaundryIntoDB = async (
    id: string,
    payload: Partial<TLaundryRequest>,
) => {
    const result = await Laundry.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Laundry request not found');
    return result;
};

const deleteLaundryFromDB = async (id: string) => {
    const result = await Laundry.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Laundry request not found');
    return result;
};

export const LaundryServices = {
    createLaundryIntoDB,
    getAllLaundryFromDB,
    getSingleLaundryFromDB,
    updateLaundryIntoDB,
    deleteLaundryFromDB,
};
