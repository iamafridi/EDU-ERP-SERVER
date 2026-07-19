import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { FacilitySearchableFields } from './facility.constant';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};

const getAllFacilitiesFromDB = async (query: Record<string, unknown>) => {
    const facilityQuery = new QueryBuilder(Facility.find(), query)
        .search(FacilitySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await facilityQuery.modelQuery;
    const meta = await facilityQuery.countTotal();
    return { data, meta };
};

const getSingleFacilityFromDB = async (id: string) => {
    const result = await Facility.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
    }
    return result;
};

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    const result = await Facility.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
    }
    return result;
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
    }
    return result;
};

export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
};
