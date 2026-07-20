import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TCounseling } from './counseling.interface';
import { Counseling } from './counseling.model';

const createCounselingIntoDB = async (payload: TCounseling) => {
    const result = await Counseling.create(payload);
    return result;
};

const getAllCounselingsFromDB = async (query: Record<string, unknown>) => {
    const counselingQuery = new QueryBuilder(
        Counseling.find().populate('student counselor'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await counselingQuery.modelQuery;
    const meta = await counselingQuery.countTotal();
    return { data, meta };
};

const getSingleCounselingFromDB = async (id: string) => {
    const result = await Counseling.findById(id).populate('student counselor');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Counseling session not found');
    return result;
};

const updateCounselingIntoDB = async (id: string, payload: Partial<TCounseling>) => {
    const result = await Counseling.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Counseling session not found');
    return result;
};

const deleteCounselingFromDB = async (id: string) => {
    const result = await Counseling.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Counseling session not found');
    return result;
};

export const CounselingServices = {
    createCounselingIntoDB,
    getAllCounselingsFromDB,
    getSingleCounselingFromDB,
    updateCounselingIntoDB,
    deleteCounselingFromDB,
};
