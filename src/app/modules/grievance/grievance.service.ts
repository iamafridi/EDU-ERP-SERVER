import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { GrievanceSearchableFields } from './grievance.constant';
import { TGrievance } from './grievance.interface';
import { Grievance } from './grievance.model';

const createGrievanceIntoDB = async (payload: TGrievance) => {
    const result = await Grievance.create(payload);
    return result;
};

const getAllGrievancesFromDB = async (query: Record<string, unknown>) => {
    const grievanceQuery = new QueryBuilder(
        Grievance.find().populate('complainant assignedTo'),
        query,
    )
        .search(GrievanceSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await grievanceQuery.modelQuery;
    const meta = await grievanceQuery.countTotal();
    return { data, meta };
};

const getSingleGrievanceFromDB = async (id: string) => {
    const result = await Grievance.findById(id).populate('complainant assignedTo');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grievance not found');
    return result;
};

const updateGrievanceIntoDB = async (id: string, payload: Partial<TGrievance>) => {
    if (payload.status === 'resolved') {
        payload.resolvedAt = new Date();
    }
    const result = await Grievance.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grievance not found');
    return result;
};

const deleteGrievanceFromDB = async (id: string) => {
    const result = await Grievance.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grievance not found');
    return result;
};

export const GrievanceServices = {
    createGrievanceIntoDB,
    getAllGrievancesFromDB,
    getSingleGrievanceFromDB,
    updateGrievanceIntoDB,
    deleteGrievanceFromDB,
};
