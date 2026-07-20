import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IPDServices } from './ipd.service';

const createAdmission = catchAsync(async (req, res) => {
    const result = await IPDServices.createAdmissionIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Patient admitted successfully',
        data: result,
    });
});

const getAllAdmissions = catchAsync(async (req, res) => {
    const { data, meta } = await IPDServices.getAllAdmissionsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admissions retrieved successfully',
        meta,
        data,
    });
});

const getCurrentAdmissions = catchAsync(async (req, res) => {
    const result = await IPDServices.getCurrentAdmissionsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Current admissions retrieved successfully',
        data: result,
    });
});

const getSingleAdmission = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await IPDServices.getSingleAdmissionFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admission retrieved successfully',
        data: result,
    });
});

const updateAdmission = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await IPDServices.updateAdmissionIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admission updated successfully',
        data: result,
    });
});

const dischargePatient = catchAsync(async (req, res) => {
    const { admissionId } = req.params;
    const result = await IPDServices.dischargePatientFromDB(admissionId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient discharged successfully',
        data: result,
    });
});

const getDischarges = catchAsync(async (req, res) => {
    const { data, meta } = await IPDServices.getDischargesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Discharges retrieved successfully',
        meta,
        data,
    });
});

const getAdmissionByPatient = catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const result = await IPDServices.getAdmissionByPatientFromDB(patientId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient admissions retrieved successfully',
        data: result,
    });
});

export const IPDControllers = {
    createAdmission,
    getAllAdmissions,
    getCurrentAdmissions,
    getSingleAdmission,
    updateAdmission,
    dischargePatient,
    getDischarges,
    getAdmissionByPatient,
};
