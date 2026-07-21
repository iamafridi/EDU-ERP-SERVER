import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AccreditationServices } from './accreditation.service';

const createAccreditation = catchAsync(async (req, res) => {
    const result = await AccreditationServices.createAccreditationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Accreditation record created successfully',
        data: result,
    });
});

const getAllAccreditations = catchAsync(async (req, res) => {
    const { data, meta } = await AccreditationServices.getAllAccreditationsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Accreditation records retrieved successfully',
        meta,
        data,
    });
});

const getSingleAccreditation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AccreditationServices.getSingleAccreditationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Accreditation record retrieved successfully',
        data: result,
    });
});

const updateAccreditation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AccreditationServices.updateAccreditationIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Accreditation record updated successfully',
        data: result,
    });
});

const deleteAccreditation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AccreditationServices.deleteAccreditationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Accreditation record deleted successfully',
        data: result,
    });
});

export const AccreditationControllers = {
    createAccreditation,
    getAllAccreditations,
    getSingleAccreditation,
    updateAccreditation,
    deleteAccreditation,
};
