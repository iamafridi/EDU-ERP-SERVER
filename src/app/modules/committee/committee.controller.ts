import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommitteeServices } from './committee.service';

const createCommittee = catchAsync(async (req, res) => {
    const result = await CommitteeServices.createCommitteeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Committee created successfully',
        data: result,
    });
});

const getAllCommittees = catchAsync(async (req, res) => {
    const { data, meta } = await CommitteeServices.getAllCommitteesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Committees retrieved successfully',
        meta,
        data,
    });
});

const getSingleCommittee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommitteeServices.getSingleCommitteeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Committee retrieved successfully',
        data: result,
    });
});

const updateCommittee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommitteeServices.updateCommitteeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Committee updated successfully',
        data: result,
    });
});

const deleteCommittee = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommitteeServices.deleteCommitteeFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Committee deleted successfully',
        data: result,
    });
});

export const CommitteeControllers = {
    createCommittee,
    getAllCommittees,
    getSingleCommittee,
    updateCommittee,
    deleteCommittee,
};
