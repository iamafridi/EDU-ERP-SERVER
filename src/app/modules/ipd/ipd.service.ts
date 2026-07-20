import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IPDSearchableFields } from './ipd.constant';
import { TIPDAdmission, TIPDDischarge } from './ipd.interface';
import { IPDAdmission, IPDDischarge } from './ipd.model';

const createAdmissionIntoDB = async (payload: TIPDAdmission) => {
    const result = await IPDAdmission.create(payload);
    return result;
};

const getAllAdmissionsFromDB = async (query: Record<string, unknown>) => {
    const admissionQuery = new QueryBuilder(
        IPDAdmission.find().populate('patientId doctorId'),
        query,
    )
        .search(IPDSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await admissionQuery.modelQuery;
    const meta = await admissionQuery.countTotal();
    return { data, meta };
};

const getCurrentAdmissionsFromDB = async () => {
    const result = await IPDAdmission.find({ status: 'admitted' })
        .populate('patientId doctorId')
        .sort({ admissionDate: -1 });
    return result;
};

const getSingleAdmissionFromDB = async (id: string) => {
    const result = await IPDAdmission.findById(id).populate('patientId doctorId');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Admission not found');
    return result;
};

const updateAdmissionIntoDB = async (id: string, payload: Partial<TIPDAdmission>) => {
    const result = await IPDAdmission.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Admission not found');
    return result;
};

const dischargePatientFromDB = async (admissionId: string, payload: TIPDDischarge) => {
    const admission = await IPDAdmission.findById(admissionId);
    if (!admission) throw new AppError(httpStatus.NOT_FOUND, 'Admission not found');

    const discharge = await IPDDischarge.create({
        ...payload,
        admissionId,
    });

    await IPDAdmission.findByIdAndUpdate(admissionId, { status: 'discharged' });

    return discharge;
};

const getDischargesFromDB = async (query: Record<string, unknown>) => {
    const dischargeQuery = new QueryBuilder(
        IPDDischarge.find().populate({
            path: 'admissionId',
            populate: { path: 'patientId doctorId' },
        }),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await dischargeQuery.modelQuery;
    const meta = await dischargeQuery.countTotal();
    return { data, meta };
};

const getAdmissionByPatientFromDB = async (patientId: string) => {
    const result = await IPDAdmission.find({ patientId })
        .populate('doctorId')
        .sort({ admissionDate: -1 });
    return result;
};

export const IPDServices = {
    createAdmissionIntoDB,
    getAllAdmissionsFromDB,
    getCurrentAdmissionsFromDB,
    getSingleAdmissionFromDB,
    updateAdmissionIntoDB,
    dischargePatientFromDB,
    getDischargesFromDB,
    getAdmissionByPatientFromDB,
};
