import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AccreditationSearchableFields } from './accreditation.constant';
import { TAccreditation } from './accreditation.interface';
import { Accreditation } from './accreditation.model';

const createAccreditationIntoDB = async (payload: TAccreditation) => {
    const result = await Accreditation.create(payload);
    return result;
};

const getAllAccreditationsFromDB = async (query: Record<string, unknown>) => {
    const accreditationQuery = new QueryBuilder(
        Accreditation.find(),
        query,
    )
        .search(AccreditationSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await accreditationQuery.modelQuery;
    const meta = await accreditationQuery.countTotal();
    return { data, meta };
};

const getSingleAccreditationFromDB = async (id: string) => {
    const result = await Accreditation.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Accreditation record not found');
    return result;
};

const updateAccreditationIntoDB = async (id: string, payload: Partial<TAccreditation>) => {
    if (payload.status === 'submitted') {
        payload.submittedDate = new Date();
    }
    const result = await Accreditation.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Accreditation record not found');
    return result;
};

const deleteAccreditationFromDB = async (id: string) => {
    const result = await Accreditation.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Accreditation record not found');
    return result;
};

export const AccreditationServices = {
    createAccreditationIntoDB,
    getAllAccreditationsFromDB,
    getSingleAccreditationFromDB,
    updateAccreditationIntoDB,
    deleteAccreditationFromDB,
};
