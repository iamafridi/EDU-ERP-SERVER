import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdmissionServices } from './admission.service';

const createApplication = catchAsync(async (req, res) => {
    const result = await AdmissionServices.createApplicationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Application submitted successfully',
        data: result,
    });
});

const getAllApplications = catchAsync(async (req, res) => {
    const { data, meta } = await AdmissionServices.getAllApplicationsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Applications retrieved successfully',
        meta,
        data,
    });
});

const getSingleApplication = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdmissionServices.getSingleApplicationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Application retrieved successfully',
        data: result,
    });
});

const updateApplicationStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = { ...req.body, reviewedBy: req.user?.userId };
    const result = await AdmissionServices.updateApplicationStatusIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Application status updated successfully',
        data: result,
    });
});

const deleteApplication = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdmissionServices.deleteApplicationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Application deleted successfully',
        data: result,
    });
});

const createMeritList = catchAsync(async (req, res) => {
    const result = await AdmissionServices.createMeritListIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Merit list entry created successfully',
        data: result,
    });
});

const getAllMeritLists = catchAsync(async (req, res) => {
    const { data, meta } = await AdmissionServices.getAllMeritListsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Merit lists retrieved successfully',
        meta,
        data,
    });
});

const deleteMeritList = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdmissionServices.deleteMeritListFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Merit list entry deleted successfully',
        data: result,
    });
});

export const AdmissionControllers = {
    createApplication,
    getAllApplications,
    getSingleApplication,
    updateApplicationStatus,
    deleteApplication,
    createMeritList,
    getAllMeritLists,
    deleteMeritList,
};
