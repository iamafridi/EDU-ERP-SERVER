import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { NoticeSearchableFields } from './notice.constant';
import { TNotice } from './notice.interface';
import { Notice } from './notice.model';

const createNoticeIntoDB = async (payload: TNotice) => {
    const result = await Notice.create(payload);
    return result;
};

const getAllNoticesFromDB = async (query: Record<string, unknown>) => {
    const filterQuery = { ...query };
    if (filterQuery.targetRoles) {
        filterQuery.targetRoles = { $in: [filterQuery.targetRoles] };
    }
    const noticeQuery = new QueryBuilder(
        Notice.find().populate('publishedBy'),
        filterQuery,
    )
        .search(NoticeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await noticeQuery.modelQuery;
    const meta = await noticeQuery.countTotal();
    return { data, meta };
};

const getSingleNoticeFromDB = async (id: string) => {
    const result = await Notice.findById(id).populate('publishedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notice not found');
    return result;
};

const updateNoticeIntoDB = async (id: string, payload: Partial<TNotice>) => {
    const result = await Notice.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notice not found');
    return result;
};

const deleteNoticeFromDB = async (id: string) => {
    const result = await Notice.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notice not found');
    return result;
};

export const NoticeServices = {
    createNoticeIntoDB,
    getAllNoticesFromDB,
    getSingleNoticeFromDB,
    updateNoticeIntoDB,
    deleteNoticeFromDB,
};
