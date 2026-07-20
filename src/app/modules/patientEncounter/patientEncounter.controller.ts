import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientEncounterServices } from './patientEncounter.service';

const createPatientEncounter = catchAsync(async (req, res) => {
    const result = await PatientEncounterServices.createPatientEncounterIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Patient encounter logged successfully',
        data: result,
    });
});

const getAllPatientEncounters = catchAsync(async (req, res) => {
    const { data, meta } = await PatientEncounterServices.getAllPatientEncountersFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient encounters retrieved successfully',
        meta,
        data,
    });
});

const getSinglePatientEncounter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatientEncounterServices.getSinglePatientEncounterFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient encounter retrieved successfully',
        data: result,
    });
});

const updatePatientEncounter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatientEncounterServices.updatePatientEncounterIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient encounter updated successfully',
        data: result,
    });
});

const deletePatientEncounter = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PatientEncounterServices.deletePatientEncounterFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient encounter deleted successfully',
        data: result,
    });
});

export const PatientEncounterControllers = {
    createPatientEncounter,
    getAllPatientEncounters,
    getSinglePatientEncounter,
    updatePatientEncounter,
    deletePatientEncounter,
};
