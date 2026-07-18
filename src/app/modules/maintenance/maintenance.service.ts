import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { MaintenanceSearchableFields } from './maintenance.constant';
import { TMaintenance, TMaintenanceComplaint } from './maintenance.interface';
import { Maintenance, MaintenanceComplaint } from './maintenance.model';

// Profile
const createMaintenanceProfileIntoDB = async (payload: TMaintenance) => {
    const result = await Maintenance.create(payload);
    return result;
};

const getMaintenanceProfileFromDB = async (id: string) => {
    const result = await Maintenance.findOne({ user: id }).populate('user');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Maintenance profile not found');
    return result;
};

const updateMaintenanceProfileIntoDB = async (id: string, payload: Partial<TMaintenance>) => {
    const result = await Maintenance.findOneAndUpdate({ user: id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Maintenance profile not found');
    return result;
};

// Complaints
const createComplaintIntoDB = async (payload: TMaintenanceComplaint) => {
    const result = await MaintenanceComplaint.create(payload);
    return result;
};

const getAllComplaintsFromDB = async (query: Record<string, unknown>) => {
    const complaintQuery = new QueryBuilder(
        MaintenanceComplaint.find().populate('reportedBy assignedTo'),
        query,
    )
        .search(MaintenanceSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await complaintQuery.modelQuery;
    const meta = await complaintQuery.countTotal();
    return { data, meta };
};

const getSingleComplaintFromDB = async (id: string) => {
    const result = await MaintenanceComplaint.findById(id).populate('reportedBy assignedTo');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
    return result;
};

const updateComplaintStatusIntoDB = async (
    id: string,
    payload: Partial<TMaintenanceComplaint>,
) => {
    const updateData: Record<string, unknown> = { ...payload };
    if (payload.status === 'resolved') {
        updateData.resolvedAt = new Date();
    }
    const result = await MaintenanceComplaint.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).populate('reportedBy assignedTo');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
    return result;
};

const deleteComplaintFromDB = async (id: string) => {
    const result = await MaintenanceComplaint.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
    return result;
};

export const MaintenanceServices = {
    createMaintenanceProfileIntoDB,
    getMaintenanceProfileFromDB,
    updateMaintenanceProfileIntoDB,
    createComplaintIntoDB,
    getAllComplaintsFromDB,
    getSingleComplaintFromDB,
    updateComplaintStatusIntoDB,
    deleteComplaintFromDB,
};
