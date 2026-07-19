import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransportServices } from './transport.service';

// Vehicle
const createVehicle = catchAsync(async (req, res) => {
    const result = await TransportServices.createVehicleIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Vehicle created successfully',
        data: result,
    });
});

const getAllVehicles = catchAsync(async (req, res) => {
    const { data, meta } = await TransportServices.getAllVehiclesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vehicles retrieved successfully',
        meta,
        data,
    });
});

const getSingleVehicle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.getSingleVehicleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vehicle retrieved successfully',
        data: result,
    });
});

const updateVehicle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.updateVehicleIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vehicle updated successfully',
        data: result,
    });
});

const deleteVehicle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.deleteVehicleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vehicle deleted successfully',
        data: result,
    });
});

// Route
const createRoute = catchAsync(async (req, res) => {
    const result = await TransportServices.createRouteIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Route created successfully',
        data: result,
    });
});

const getAllRoutes = catchAsync(async (req, res) => {
    const { data, meta } = await TransportServices.getAllRoutesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Routes retrieved successfully',
        meta,
        data,
    });
});

const getSingleRoute = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.getSingleRouteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Route retrieved successfully',
        data: result,
    });
});

const updateRoute = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.updateRouteIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Route updated successfully',
        data: result,
    });
});

const deleteRoute = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.deleteRouteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Route deleted successfully',
        data: result,
    });
});

// Fee
const createFee = catchAsync(async (req, res) => {
    const result = await TransportServices.createFeeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Transport fee created successfully',
        data: result,
    });
});

const getAllFees = catchAsync(async (req, res) => {
    const { data, meta } = await TransportServices.getAllFeesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transport fees retrieved successfully',
        meta,
        data,
    });
});

const updateFee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.updateFeeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transport fee updated successfully',
        data: result,
    });
});

const deleteFee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TransportServices.deleteFeeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transport fee deleted successfully',
        data: result,
    });
});

export const TransportControllers = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
    createRoute,
    getAllRoutes,
    getSingleRoute,
    updateRoute,
    deleteRoute,
    createFee,
    getAllFees,
    updateFee,
    deleteFee,
};
