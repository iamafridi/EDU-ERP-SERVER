import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { LeaveSearchableFields } from './leave.constant';
import { TLeave } from './leave.interface';
import { Leave } from './leave.model';

const createLeaveIntoDB = async (payload: TLeave) => {
    const result = await Leave.create(payload);
    return result;
};

const getAllLeavesFromDB = async (query: Record<string, unknown>) => {
    const leaveQuery = new QueryBuilder(
        Leave.find().populate('employee approvedBy'),
        query,
    )
        .search(LeaveSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await leaveQuery.modelQuery;
    const meta = await leaveQuery.countTotal();
    return { data, meta };
};

const getSingleLeaveFromDB = async (id: string) => {
    const result = await Leave.findById(id).populate('employee approvedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Leave record not found');
    return result;
};

const updateLeaveIntoDB = async (id: string, payload: Partial<TLeave>) => {
    const result = await Leave.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Leave record not found');
    return result;
};

const deleteLeaveFromDB = async (id: string) => {
    const result = await Leave.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Leave record not found');
    return result;
};

const approveLeaveIntoDB = async (id: string, approvedBy: string) => {
    const result = await Leave.findByIdAndUpdate(
        id,
        { status: 'approved', approvedBy: approvedBy as any },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Leave record not found');
    return result;
};

const rejectLeaveIntoDB = async (id: string, remarks?: string) => {
    const leave = await Leave.findById(id);
    if (!leave) throw new AppError(httpStatus.NOT_FOUND, 'Leave record not found');
    if (leave.status !== 'pending') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Leave is not in pending status');
    }
    leave.status = 'rejected';
    if (remarks) leave.remarks = remarks;
    await leave.save();
    return leave;
};

export const LeaveServices = {
    createLeaveIntoDB,
    getAllLeavesFromDB,
    getSingleLeaveFromDB,
    updateLeaveIntoDB,
    deleteLeaveFromDB,
    approveLeaveIntoDB,
    rejectLeaveIntoDB,
};
