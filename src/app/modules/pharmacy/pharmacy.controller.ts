import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PharmacyServices } from './pharmacy.service';

const createDrug = catchAsync(async (req, res) => {
    const result = await PharmacyServices.createDrugIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Drug created successfully',
        data: result,
    });
});

const getAllDrugs = catchAsync(async (req, res) => {
    const { data, meta } = await PharmacyServices.getAllDrugsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Drugs retrieved successfully',
        meta,
        data,
    });
});

const getLowStockDrugs = catchAsync(async (req, res) => {
    const result = await PharmacyServices.getLowStockDrugsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Low stock drugs retrieved successfully',
        data: result,
    });
});

const getSingleDrug = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PharmacyServices.getSingleDrugFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Drug retrieved successfully',
        data: result,
    });
});

const updateDrug = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PharmacyServices.updateDrugIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Drug updated successfully',
        data: result,
    });
});

const deleteDrug = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PharmacyServices.deleteDrugFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Drug deleted successfully',
        data: result,
    });
});

const createPrescription = catchAsync(async (req, res) => {
    const result = await PharmacyServices.createPrescriptionIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Prescription created successfully',
        data: result,
    });
});

const getAllPrescriptions = catchAsync(async (req, res) => {
    const { data, meta } = await PharmacyServices.getAllPrescriptionsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Prescriptions retrieved successfully',
        meta,
        data,
    });
});

const getPatientPrescriptions = catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const result = await PharmacyServices.getPatientPrescriptionsFromDB(patientId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient prescriptions retrieved successfully',
        data: result,
    });
});

const createDispensing = catchAsync(async (req, res) => {
    const result = await PharmacyServices.createDispensingIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Dispensing recorded successfully',
        data: result,
    });
});

const getAllDispensings = catchAsync(async (req, res) => {
    const { data, meta } = await PharmacyServices.getAllDispensingsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dispensings retrieved successfully',
        meta,
        data,
    });
});

export const PharmacyControllers = {
    createDrug,
    getAllDrugs,
    getLowStockDrugs,
    getSingleDrug,
    updateDrug,
    deleteDrug,
    createPrescription,
    getAllPrescriptions,
    getPatientPrescriptions,
    createDispensing,
    getAllDispensings,
};
