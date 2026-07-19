import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { InventorySearchableFields } from './inventory.constant';
import { TInventoryItem } from './inventory.interface';
import { Inventory } from './inventory.model';

const createInventoryIntoDB = async (payload: TInventoryItem) => {
    const result = await Inventory.create(payload);
    return result;
};

const getAllInventoryFromDB = async (query: Record<string, unknown>) => {
    const inventoryQuery = new QueryBuilder(
        Inventory.find().populate('room'),
        query,
    )
        .search(InventorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await inventoryQuery.modelQuery;
    const meta = await inventoryQuery.countTotal();
    return { data, meta };
};

const getSingleInventoryFromDB = async (id: string) => {
    const result = await Inventory.findById(id).populate('room');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Inventory item not found');
    return result;
};

const updateInventoryIntoDB = async (
    id: string,
    payload: Partial<TInventoryItem>,
) => {
    const result = await Inventory.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Inventory item not found');
    return result;
};

const deleteInventoryFromDB = async (id: string) => {
    const result = await Inventory.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Inventory item not found');
    return result;
};

export const InventoryServices = {
    createInventoryIntoDB,
    getAllInventoryFromDB,
    getSingleInventoryFromDB,
    updateInventoryIntoDB,
    deleteInventoryFromDB,
};
