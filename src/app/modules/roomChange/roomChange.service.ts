import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RoomChangeSearchableFields } from './roomChange.constant';
import { TRoomChangeRequest } from './roomChange.interface';
import { RoomChange } from './roomChange.model';
import { Room, RoomStudent } from '../room/room.model';

const createRoomChangeIntoDB = async (payload: TRoomChangeRequest) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await RoomChange.create([payload], { session });

        session.commitTransaction();
        session.endSession();
        return result[0];
    } catch (err) {
        session.abortTransaction();
        session.endSession();
        throw err;
    }
};

const getAllRoomChangesFromDB = async (query: Record<string, unknown>) => {
    const roomChangeQuery = new QueryBuilder(
        RoomChange.find().populate('student currentRoom requestedRoom approvedBy'),
        query,
    )
        .search(RoomChangeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await roomChangeQuery.modelQuery;
    const meta = await roomChangeQuery.countTotal();
    return { data, meta };
};

const getSingleRoomChangeFromDB = async (id: string) => {
    const result = await RoomChange.findById(id).populate(
        'student currentRoom requestedRoom approvedBy',
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room change request not found');
    }
    return result;
};

const approveRoomChangeIntoDB = async (
    id: string,
    payload: { status: 'approved' | 'rejected'; remarks?: string },
) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const request = await RoomChange.findById(id).session(session);
        if (!request) {
            throw new AppError(httpStatus.NOT_FOUND, 'Room change request not found');
        }
        if (request.status !== 'pending') {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Request has already been processed',
            );
        }

        if (payload.status === 'approved') {
            await RoomStudent.findOneAndUpdate(
                { room: request.currentRoom },
                { $pull: { students: request.student } },
                { session },
            );
            await RoomStudent.findOneAndUpdate(
                { room: request.requestedRoom },
                { $addToSet: { students: request.student } },
                { upsert: true, session },
            );
        }

        const result = await RoomChange.findByIdAndUpdate(
            id,
            {
                status: payload.status,
                remarks: payload.remarks,
                approvalDate: new Date(),
            },
            { new: true, session },
        );

        session.commitTransaction();
        session.endSession();
        return result;
    } catch (err) {
        session.abortTransaction();
        session.endSession();
        throw err;
    }
};

const deleteRoomChangeFromDB = async (id: string) => {
    const result = await RoomChange.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room change request not found');
    }
    return result;
};

export const RoomChangeServices = {
    createRoomChangeIntoDB,
    getAllRoomChangesFromDB,
    getSingleRoomChangeFromDB,
    approveRoomChangeIntoDB,
    deleteRoomChangeFromDB,
};
