import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PatientEncounterSearchableFields } from './patientEncounter.constant';
import { TPatientEncounter } from './patientEncounter.interface';
import { PatientEncounter } from './patientEncounter.model';

const createPatientEncounterIntoDB = async (payload: TPatientEncounter) => {
    const result = await PatientEncounter.create(payload);
    return result;
};

const getAllPatientEncountersFromDB = async (query: Record<string, unknown>) => {
    const encounterQuery = new QueryBuilder(
        PatientEncounter.find().populate('student supervisedBy'),
        query,
    )
        .search(PatientEncounterSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await encounterQuery.modelQuery;
    const meta = await encounterQuery.countTotal();
    return { data, meta };
};

const getSinglePatientEncounterFromDB = async (id: string) => {
    const result = await PatientEncounter.findById(id).populate('student supervisedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Patient encounter not found');
    return result;
};

const updatePatientEncounterIntoDB = async (id: string, payload: Partial<TPatientEncounter>) => {
    const result = await PatientEncounter.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Patient encounter not found');
    return result;
};

const deletePatientEncounterFromDB = async (id: string) => {
    const result = await PatientEncounter.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Patient encounter not found');
    return result;
};

export const PatientEncounterServices = {
    createPatientEncounterIntoDB,
    getAllPatientEncountersFromDB,
    getSinglePatientEncounterFromDB,
    updatePatientEncounterIntoDB,
    deletePatientEncounterFromDB,
};
