import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ClinicalRotationSearchableFields } from './clinicalRotation.constant';
import { TClinicalRotation } from './clinicalRotation.interface';
import { ClinicalRotation } from './clinicalRotation.model';

const createClinicalRotationIntoDB = async (payload: TClinicalRotation) => {
    const result = await ClinicalRotation.create(payload);
    return result;
};

const getAllClinicalRotationsFromDB = async (query: Record<string, unknown>) => {
    const rotationQuery = new QueryBuilder(
        ClinicalRotation.find().populate('student faculty'),
        query,
    )
        .search(ClinicalRotationSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await rotationQuery.modelQuery;
    const meta = await rotationQuery.countTotal();
    return { data, meta };
};

const getSingleClinicalRotationFromDB = async (id: string) => {
    const result = await ClinicalRotation.findById(id).populate('student faculty');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Clinical rotation not found');
    return result;
};

const updateClinicalRotationIntoDB = async (id: string, payload: Partial<TClinicalRotation>) => {
    const result = await ClinicalRotation.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Clinical rotation not found');
    return result;
};

const deleteClinicalRotationFromDB = async (id: string) => {
    const result = await ClinicalRotation.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Clinical rotation not found');
    return result;
};

export const ClinicalRotationServices = {
    createClinicalRotationIntoDB,
    getAllClinicalRotationsFromDB,
    getSingleClinicalRotationFromDB,
    updateClinicalRotationIntoDB,
    deleteClinicalRotationFromDB,
};
