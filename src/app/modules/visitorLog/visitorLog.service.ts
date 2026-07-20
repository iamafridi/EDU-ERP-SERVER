import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { VisitorLogSearchableFields } from './visitorLog.constant';
import { TVisitorLog } from './visitorLog.interface';
import { VisitorLog } from './visitorLog.model';

const createVisitorLogIntoDB = async (payload: TVisitorLog) => {
    const result = await VisitorLog.create(payload);
    return result;
};

const getAllVisitorLogsFromDB = async (query: Record<string, unknown>) => {
    const visitorLogQuery = new QueryBuilder(
        VisitorLog.find().populate('student approvedBy'),
        query,
    )
        .search(VisitorLogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await visitorLogQuery.modelQuery;
    const meta = await visitorLogQuery.countTotal();
    return { data, meta };
};

const getSingleVisitorLogFromDB = async (id: string) => {
    const result = await VisitorLog.findById(id).populate('student approvedBy');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Visitor log not found');
    }
    return result;
};

const updateVisitorLogIntoDB = async (id: string, payload: Partial<TVisitorLog>) => {
    const result = await VisitorLog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Visitor log not found');
    }
    return result;
};

const deleteVisitorLogFromDB = async (id: string) => {
    const result = await VisitorLog.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Visitor log not found');
    }
    return result;
};

export const VisitorLogServices = {
    createVisitorLogIntoDB,
    getAllVisitorLogsFromDB,
    getSingleVisitorLogFromDB,
    updateVisitorLogIntoDB,
    deleteVisitorLogFromDB,
};
