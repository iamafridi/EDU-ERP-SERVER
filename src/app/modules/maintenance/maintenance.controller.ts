import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { MaintenanceServices } from './maintenance.service';

const createMaintenanceProfile = catchAsync(async (req, res) => {
    const result = await MaintenanceServices.createMaintenanceProfileIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Maintenance profile created successfully',
        data: result,
    });
});

const getMaintenanceProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MaintenanceServices.getMaintenanceProfileFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Maintenance profile retrieved successfully',
        data: result,
    });
});

const updateMaintenanceProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MaintenanceServices.updateMaintenanceProfileIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Maintenance profile updated successfully',
        data: result,
    });
});

const createComplaint = catchAsync(async (req, res) => {
    const payload = { ...req.body, reportedBy: req.user?.userId };
    const result = await MaintenanceServices.createComplaintIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Complaint reported successfully',
        data: result,
    });
});

const getSingleComplaint = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MaintenanceServices.getSingleComplaintFromDB(id);
    assertOwnership(req, result, 'maintenance-complaint');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Complaint retrieved successfully',
        data: result,
    });
});

const getAllComplaints = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'maintenance-complaint');
    const { data, meta } = await MaintenanceServices.getAllComplaintsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Complaints retrieved successfully',
        meta,
        data,
    });
});

const updateComplaintStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await MaintenanceServices.getSingleComplaintFromDB(id);
    assertOwnership(req, record, 'maintenance-complaint');
    const result = await MaintenanceServices.updateComplaintStatusIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Complaint status updated successfully',
        data: result,
    });
});

const deleteComplaint = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await MaintenanceServices.getSingleComplaintFromDB(id);
    assertOwnership(req, record, 'maintenance-complaint');
    const result = await MaintenanceServices.deleteComplaintFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Complaint deleted successfully',
        data: result,
    });
});

export const MaintenanceControllers = {
    createMaintenanceProfile,
    getMaintenanceProfile,
    updateMaintenanceProfile,
    createComplaint,
    getAllComplaints,
    getSingleComplaint,
    updateComplaintStatus,
    deleteComplaint,
};
