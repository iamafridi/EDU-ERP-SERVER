import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ReportSearchableFields } from './report.constant';
import { TReport } from './report.interface';
import { Report } from './report.model';

const createReportIntoDB = async (payload: TReport) => {
    const result = await Report.create(payload);
    return result;
};

const getAllReportsFromDB = async (query: Record<string, unknown>) => {
    const reportQuery = new QueryBuilder(Report.find(), query)
        .search(ReportSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await reportQuery.modelQuery;
    const meta = await reportQuery.countTotal();
    return { data, meta };
};

const getSingleReportFromDB = async (id: string) => {
    const result = await Report.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
    return result;
};

const deleteReportFromDB = async (id: string) => {
    const result = await Report.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
    return result;
};

export const ReportServices = {
    createReportIntoDB,
    getAllReportsFromDB,
    getSingleReportFromDB,
    deleteReportFromDB,
};
