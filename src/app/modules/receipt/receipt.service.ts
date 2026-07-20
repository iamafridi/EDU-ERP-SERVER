import httpStatus from 'http-status';
import crypto from 'crypto';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ReceiptSearchableFields } from './receipt.constant';
import { TReceipt } from './receipt.interface';
import { Receipt } from './receipt.model';

const generateReceiptNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `RCP-${timestamp}-${random}`;
};

const createReceiptIntoDB = async (payload: TReceipt) => {
    payload.receiptNumber = generateReceiptNumber();
    payload.qrToken = crypto.randomBytes(16).toString('hex');
    payload.generatedAt = new Date();
    const result = await Receipt.create(payload);
    return result;
};

const getAllReceiptsFromDB = async (query: Record<string, unknown>) => {
    const receiptQuery = new QueryBuilder(
        Receipt.find().populate('payment fee student'),
        query,
    )
        .search(ReceiptSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await receiptQuery.modelQuery;
    const meta = await receiptQuery.countTotal();
    return { data, meta };
};

const getSingleReceiptFromDB = async (id: string) => {
    const result = await Receipt.findById(id).populate('payment fee student');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Receipt not found');
    return result;
};

const deleteReceiptFromDB = async (id: string) => {
    const result = await Receipt.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Receipt not found');
    return result;
};

export const ReceiptServices = {
    createReceiptIntoDB,
    getAllReceiptsFromDB,
    getSingleReceiptFromDB,
    deleteReceiptFromDB,
};
