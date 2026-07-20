import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { ReceiptServices } from './receipt.service';

const createReceipt = catchAsync(async (req, res) => {
    const result = await ReceiptServices.createReceiptIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Receipt generated successfully',
        data: result,
    });
});

const getAllReceipts = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'receipt');
    const { data, meta } = await ReceiptServices.getAllReceiptsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Receipts retrieved successfully',
        meta,
        data,
    });
});

const getSingleReceipt = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReceiptServices.getSingleReceiptFromDB(id);
    assertOwnership(req, result, 'receipt');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Receipt retrieved successfully',
        data: result,
    });
});

const deleteReceipt = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await ReceiptServices.getSingleReceiptFromDB(id);
    assertOwnership(req, record, 'receipt');
    const result = await ReceiptServices.deleteReceiptFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Receipt deleted successfully',
        data: result,
    });
});

export const ReceiptControllers = {
    createReceipt,
    getAllReceipts,
    getSingleReceipt,
    deleteReceipt,
};
