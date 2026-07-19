import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InventoryServices } from './inventory.service';

const createInventoryItem = catchAsync(async (req, res) => {
    const result = await InventoryServices.createInventoryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Inventory item created successfully',
        data: result,
    });
});

const getAllInventoryItems = catchAsync(async (req, res) => {
    const { data, meta } = await InventoryServices.getAllInventoryFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inventory items retrieved successfully',
        meta,
        data,
    });
});

const getSingleInventoryItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await InventoryServices.getSingleInventoryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inventory item retrieved successfully',
        data: result,
    });
});

const updateInventoryItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await InventoryServices.updateInventoryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inventory item updated successfully',
        data: result,
    });
});

const deleteInventoryItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await InventoryServices.deleteInventoryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inventory item deleted successfully',
        data: result,
    });
});

export const InventoryControllers = {
    createInventoryItem,
    getAllInventoryItems,
    getSingleInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};
