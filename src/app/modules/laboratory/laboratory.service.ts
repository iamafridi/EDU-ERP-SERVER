import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { LabSearchableFields } from './laboratory.constant';
import { TLabTest, TLabRequest, TLabResult } from './laboratory.interface';
import { LabTest, LabRequest, LabResult } from './laboratory.model';

const createLabTestIntoDB = async (payload: TLabTest) => {
    const result = await LabTest.create(payload);
    return result;
};

const getAllLabTestsFromDB = async (query: Record<string, unknown>) => {
    const testQuery = new QueryBuilder(LabTest.find(), query)
        .search(['code', 'name'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await testQuery.modelQuery;
    const meta = await testQuery.countTotal();
    return { data, meta };
};

const getSingleLabTestFromDB = async (id: string) => {
    const result = await LabTest.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lab test not found');
    return result;
};

const updateLabTestIntoDB = async (id: string, payload: Partial<TLabTest>) => {
    const result = await LabTest.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lab test not found');
    return result;
};

const deleteLabTestFromDB = async (id: string) => {
    const result = await LabTest.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lab test not found');
    return result;
};

const createLabRequestIntoDB = async (payload: TLabRequest) => {
    const result = await LabRequest.create(payload);
    return result;
};

const getAllLabRequestsFromDB = async (query: Record<string, unknown>) => {
    const requestQuery = new QueryBuilder(
        LabRequest.find().populate('patientId doctorId tests'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await requestQuery.modelQuery;
    const meta = await requestQuery.countTotal();
    return { data, meta };
};

const updateLabRequestStatusIntoDB = async (id: string, payload: { status: string }) => {
    const result = await LabRequest.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lab request not found');
    return result;
};

const createLabResultIntoDB = async (payload: TLabResult) => {
    const result = await LabResult.create(payload);
    // Update request status to completed
    const results = await LabResult.find({ requestId: payload.requestId });
    const request = await LabRequest.findById(payload.requestId).populate('tests');
    if (request && results.length >= request.tests.length) {
        await LabRequest.findByIdAndUpdate(payload.requestId, { status: 'completed' });
    }
    return result;
};

const getResultsByRequestFromDB = async (requestId: string) => {
    const result = await LabResult.find({ requestId })
        .populate('testId technicianId')
        .sort({ resultDate: -1 });
    return result;
};

const updateLabResultIntoDB = async (id: string, payload: Partial<TLabResult>) => {
    const result = await LabResult.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lab result not found');
    return result;
};

export const LaboratoryServices = {
    createLabTestIntoDB,
    getAllLabTestsFromDB,
    getSingleLabTestFromDB,
    updateLabTestIntoDB,
    deleteLabTestFromDB,
    createLabRequestIntoDB,
    getAllLabRequestsFromDB,
    updateLabRequestStatusIntoDB,
    createLabResultIntoDB,
    getResultsByRequestFromDB,
    updateLabResultIntoDB,
};
