import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TransportSearchableFields } from './transport.constant';
import {
    TVehicle,
    TTransportRoute,
    TTransportFee,
} from './transport.interface';
import { Vehicle, TransportRoute, TransportFee } from './transport.model';

// Vehicle
const createVehicleIntoDB = async (payload: TVehicle) => {
    const result = await Vehicle.create(payload);
    return result;
};

const getAllVehiclesFromDB = async (query: Record<string, unknown>) => {
    const vehicleQuery = new QueryBuilder(Vehicle.find(), query)
        .search(TransportSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await vehicleQuery.modelQuery;
    const meta = await vehicleQuery.countTotal();
    return { data, meta };
};

const getSingleVehicleFromDB = async (id: string) => {
    const result = await Vehicle.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Vehicle not found');
    return result;
};

const updateVehicleIntoDB = async (id: string, payload: Partial<TVehicle>) => {
    const result = await Vehicle.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Vehicle not found');
    return result;
};

const deleteVehicleFromDB = async (id: string) => {
    const result = await Vehicle.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Vehicle not found');
    return result;
};

// Route
const createRouteIntoDB = async (payload: TTransportRoute) => {
    const result = await TransportRoute.create(payload);
    return result;
};

const getAllRoutesFromDB = async (query: Record<string, unknown>) => {
    const routeQuery = new QueryBuilder(
        TransportRoute.find().populate('vehicle'),
        query,
    )
        .search(TransportSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await routeQuery.modelQuery;
    const meta = await routeQuery.countTotal();
    return { data, meta };
};

const getSingleRouteFromDB = async (id: string) => {
    const result = await TransportRoute.findById(id).populate('vehicle');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Route not found');
    return result;
};

const updateRouteIntoDB = async (id: string, payload: Partial<TTransportRoute>) => {
    const result = await TransportRoute.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate('vehicle');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Route not found');
    return result;
};

const deleteRouteFromDB = async (id: string) => {
    const result = await TransportRoute.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Route not found');
    return result;
};

// Fee
const createFeeIntoDB = async (payload: TTransportFee) => {
    const result = await TransportFee.create(payload);
    return result;
};

const getAllFeesFromDB = async (query: Record<string, unknown>) => {
    const feeQuery = new QueryBuilder(
        TransportFee.find().populate('route'),
        query,
    )
        .search(TransportSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await feeQuery.modelQuery;
    const meta = await feeQuery.countTotal();
    return { data, meta };
};

const updateFeeIntoDB = async (id: string, payload: Partial<TTransportFee>) => {
    const result = await TransportFee.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate('route');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Transport fee not found');
    return result;
};

const deleteFeeFromDB = async (id: string) => {
    const result = await TransportFee.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Transport fee not found');
    return result;
};

export const TransportServices = {
    createVehicleIntoDB,
    getAllVehiclesFromDB,
    getSingleVehicleFromDB,
    updateVehicleIntoDB,
    deleteVehicleFromDB,
    createRouteIntoDB,
    getAllRoutesFromDB,
    getSingleRouteFromDB,
    updateRouteIntoDB,
    deleteRouteFromDB,
    createFeeIntoDB,
    getAllFeesFromDB,
    updateFeeIntoDB,
    deleteFeeFromDB,
};
