import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OPDServices } from './opd.service';

const createAppointment = catchAsync(async (req, res) => {
    const result = await OPDServices.createAppointmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'OPD appointment created successfully',
        data: result,
    });
});

const getAllAppointments = catchAsync(async (req, res) => {
    const { data, meta } = await OPDServices.getAllAppointmentsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OPD appointments retrieved successfully',
        meta,
        data,
    });
});

const getAppointmentsByDate = catchAsync(async (req, res) => {
    const { date } = req.params;
    const result = await OPDServices.getAppointmentsByDateFromDB(date);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OPD appointments retrieved successfully',
        data: result,
    });
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OPDServices.updateAppointmentStatusIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment status updated successfully',
        data: result,
    });
});

const deleteAppointment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OPDServices.deleteAppointmentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment deleted successfully',
        data: result,
    });
});

const createVisit = catchAsync(async (req, res) => {
    const result = await OPDServices.createVisitIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'OPD visit recorded successfully',
        data: result,
    });
});

const getAllVisits = catchAsync(async (req, res) => {
    const { data, meta } = await OPDServices.getAllVisitsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OPD visits retrieved successfully',
        meta,
        data,
    });
});

const getPatientVisits = catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const result = await OPDServices.getPatientVisitsFromDB(patientId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient visits retrieved successfully',
        data: result,
    });
});

const updateVisit = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OPDServices.updateVisitIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visit updated successfully',
        data: result,
    });
});

const deleteVisit = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OPDServices.deleteVisitFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Visit deleted successfully',
        data: result,
    });
});

export const OPDControllers = {
    createAppointment,
    getAllAppointments,
    getAppointmentsByDate,
    updateAppointmentStatus,
    deleteAppointment,
    createVisit,
    getAllVisits,
    getPatientVisits,
    updateVisit,
    deleteVisit,
};
