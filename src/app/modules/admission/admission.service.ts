import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdmissionSearchableFields } from './admission.constant';
import { TAdmissionApplication, TMeritList } from './admission.interface';
import { AdmissionApplication, MeritList } from './admission.model';

const createApplicationIntoDB = async (payload: TAdmissionApplication) => {
    const result = await AdmissionApplication.create(payload);
    return result;
};

const getAllApplicationsFromDB = async (query: Record<string, unknown>) => {
    const appQuery = new QueryBuilder(
        AdmissionApplication.find().populate('applyingFor reviewedBy'),
        query,
    )
        .search(AdmissionSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await appQuery.modelQuery;
    const meta = await appQuery.countTotal();
    return { data, meta };
};

const getSingleApplicationFromDB = async (id: string) => {
    const result = await AdmissionApplication.findById(id).populate('applyingFor reviewedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    return result;
};

const updateApplicationStatusIntoDB = async (
    id: string,
    payload: { status: string; reviewedBy: string; reviewNotes?: string },
) => {
    const result = await AdmissionApplication.findByIdAndUpdate(
        id,
        { status: payload.status, reviewedBy: payload.reviewedBy, reviewNotes: payload.reviewNotes },
        { new: true, runValidators: true },
    ).populate('applyingFor reviewedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    return result;
};

const deleteApplicationFromDB = async (id: string) => {
    const result = await AdmissionApplication.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    return result;
};

// Merit List
const createMeritListIntoDB = async (payload: TMeritList) => {
    const result = await MeritList.create(payload);
    return result;
};

const getAllMeritListsFromDB = async (query: Record<string, unknown>) => {
    const meritQuery = new QueryBuilder(
        MeritList.find().populate('application allottedSeat'),
        query,
    )
        .search(AdmissionSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await meritQuery.modelQuery;
    const meta = await meritQuery.countTotal();
    return { data, meta };
};

const deleteMeritListFromDB = async (id: string) => {
    const result = await MeritList.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Merit list entry not found');
    return result;
};

export const AdmissionServices = {
    createApplicationIntoDB,
    getAllApplicationsFromDB,
    getSingleApplicationFromDB,
    updateApplicationStatusIntoDB,
    deleteApplicationFromDB,
    createMeritListIntoDB,
    getAllMeritListsFromDB,
    deleteMeritListFromDB,
};
