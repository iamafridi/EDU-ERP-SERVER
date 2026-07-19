import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IncidentSearchableFields } from './incident.constant';
import { TIncident } from './incident.interface';
import { Incident } from './incident.model';

const createIncidentIntoDB = async (payload: TIncident) => {
    const result = await Incident.create(payload);
    return result;
};

const getAllIncidentsFromDB = async (query: Record<string, unknown>) => {
    const incidentQuery = new QueryBuilder(
        Incident.find().populate('reportedBy assignedTo'),
        query,
    )
        .search(IncidentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await incidentQuery.modelQuery;
    const meta = await incidentQuery.countTotal();
    return { data, meta };
};

const getSingleIncidentFromDB = async (id: string) => {
    const result = await Incident.findById(id).populate('reportedBy assignedTo');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Incident not found');
    }
    return result;
};

const updateIncidentIntoDB = async (id: string, payload: Partial<TIncident>) => {
    if (payload.status === 'resolved' && !payload.resolvedAt) {
        payload.resolvedAt = new Date();
    }
    const result = await Incident.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Incident not found');
    }
    return result;
};

const deleteIncidentFromDB = async (id: string) => {
    const result = await Incident.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Incident not found');
    }
    return result;
};

export const IncidentServices = {
    createIncidentIntoDB,
    getAllIncidentsFromDB,
    getSingleIncidentFromDB,
    updateIncidentIntoDB,
    deleteIncidentFromDB,
};
