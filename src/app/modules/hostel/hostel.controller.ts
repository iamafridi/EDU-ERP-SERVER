import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { HostelServices } from './hostel.service';

const createHostelRecord = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await HostelServices.createHostelIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Hostel check-in recorded successfully',
        data: result,
    });
});

const getAllHostelRecords = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'hostel');
    const { data, meta } = await HostelServices.getAllHostelRecordsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hostel records retrieved successfully',
        meta,
        data,
    });
});

const getSingleHostelRecord = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HostelServices.getSingleHostelRecordFromDB(id);
    assertOwnership(req, result, 'hostel');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hostel record retrieved successfully',
        data: result,
    });
});

const updateHostelRecord = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await HostelServices.getSingleHostelRecordFromDB(id);
    assertOwnership(req, record, 'hostel');
    const result = await HostelServices.updateHostelRecordIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hostel record updated successfully',
        data: result,
    });
});

const deleteHostelRecord = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await HostelServices.getSingleHostelRecordFromDB(id);
    assertOwnership(req, record, 'hostel');
    const result = await HostelServices.deleteHostelRecordFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hostel record deleted successfully',
        data: result,
    });
});

export const HostelControllers = {
    createHostelRecord,
    getAllHostelRecords,
    getSingleHostelRecord,
    updateHostelRecord,
    deleteHostelRecord,
};
