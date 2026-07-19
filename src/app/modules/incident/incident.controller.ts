import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { IncidentServices } from './incident.service';

const createIncident = catchAsync(async (req, res) => {
    const body = { ...req.body, reportedBy: req.user?.userId };
    const result = await IncidentServices.createIncidentIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Incident reported successfully',
        data: result,
    });
});

const getAllIncidents = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'incident');
    const { data, meta } = await IncidentServices.getAllIncidentsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Incidents retrieved successfully',
        meta,
        data,
    });
});

const getSingleIncident = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await IncidentServices.getSingleIncidentFromDB(id);
    assertOwnership(req, result, 'incident');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Incident retrieved successfully',
        data: result,
    });
});

const updateIncident = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await IncidentServices.getSingleIncidentFromDB(id);
    assertOwnership(req, record, 'incident');
    const result = await IncidentServices.updateIncidentIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Incident updated successfully',
        data: result,
    });
});

const deleteIncident = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await IncidentServices.getSingleIncidentFromDB(id);
    assertOwnership(req, record, 'incident');
    const result = await IncidentServices.deleteIncidentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Incident deleted successfully',
        data: result,
    });
});

export const IncidentControllers = {
    createIncident,
    getAllIncidents,
    getSingleIncident,
    updateIncident,
    deleteIncident,
};
