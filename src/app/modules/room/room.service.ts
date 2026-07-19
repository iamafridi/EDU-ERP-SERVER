import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RoomSearchableFields } from './room.constant';
import { TRoom, TRoomStudent, TRoomAllocation } from './room.interface';
import { Room, RoomStudent, RoomAllocation } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
    const result = await Room.create(payload);
    return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
    const roomQuery = new QueryBuilder(
        Room.find(),
        // .populate('roomFacilities.facility'),
        query,
    )
        .search(RoomSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await roomQuery.modelQuery;
    const meta = await roomQuery.countTotal();
    return { data, meta };
};

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id).populate(
        'roomFacilities.facility',
    );
    return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const { roomFacilities, ...roomRemainingData } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //step1: basic room info update
        const updatedBasicRoomInfo = await Room.findByIdAndUpdate(
            id,
            roomRemainingData,
            {
                new: true,
                runValidators: true,
                session,
            },
        );

        if (!updatedBasicRoomInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
        }

        // check if there is any room facilities to update
        if (roomFacilities && roomFacilities.length > 0) {
            // filter out the deleted fields
            const deletedFacilities = roomFacilities
                .filter((el) => el.facility && el.isDeleted)
                .map((el) => el.facility);

            const deletedRoomFacilities = await Room.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        roomFacilities: { facility: { $in: deletedFacilities } },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!deletedRoomFacilities) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
            }

            // filter out the new facility fields
            const newFacilities = roomFacilities?.filter(
                (el) => el.facility && !el.isDeleted,
            );

            const newRoomFacilities = await Room.findByIdAndUpdate(
                id,
                {
                    $addToSet: { roomFacilities: { $each: newFacilities } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!newRoomFacilities) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
            }
        }

        await session.commitTransaction();
        await session.endSession();

        const result = await Room.findById(id).populate(
            'roomFacilities.facility',
        );

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room');
    }
};

const deleteRoomFromDB = async (id: string) => {
    const result = await Room.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
    }

    return result;
};

const assignStudentsWithRoomIntoDB = async (
    id: string,
    payload: Partial<TRoomStudent>,
) => {
    const result = await RoomStudent.findOneAndUpdate(
        { room: id },
        {
            $addToSet: { students: { $each: payload } },
        },
        {
            upsert: true,
            new: true,
        },
    );
    return result;
};

const removeStudentsFromRoomFromDB = async (
    id: string,
    payload: Partial<TRoomStudent>,
) => {
    const result = await RoomStudent.findOneAndUpdate(
        { room: id },
        {
            $pull: { students: { $in: payload } },
        },
        {
            new: true,
        },
    );
    return result;
};

const createRoomAllocationIntoDB = async (payload: TRoomAllocation) => {
    const existing = await RoomAllocation.findOne({ student: payload.student });
    if (existing && existing.status === 'pending') {
        throw new AppError(
            httpStatus.CONFLICT,
            'Student already has a pending allocation request',
        );
    }
    const result = await RoomAllocation.create(payload);
    return result;
};

const getAllRoomAllocationsFromDB = async (query: Record<string, unknown>) => {
    const allocationQuery = new QueryBuilder(
        RoomAllocation.find().populate('student assignedRoom approvedBy'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await allocationQuery.modelQuery;
    const meta = await allocationQuery.countTotal();
    return { data, meta };
};

const approveRoomAllocationIntoDB = async (
    id: string,
    payload: { status: 'approved' | 'rejected'; assignedRoom?: string; remarks?: string },
    approvedById: string,
) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const allocation = await RoomAllocation.findById(id).session(session);
        if (!allocation) {
            throw new AppError(httpStatus.NOT_FOUND, 'Allocation request not found');
        }
        if (allocation.status !== 'pending') {
            throw new AppError(httpStatus.BAD_REQUEST, 'Request already processed');
        }

        const updateData: Partial<TRoomAllocation> = {
            status: payload.status,
            approvedBy: new mongoose.Types.ObjectId(approvedById),
            remarks: payload.remarks,
        };

        if (payload.status === 'approved' && payload.assignedRoom) {
            updateData.assignedRoom = new mongoose.Types.ObjectId(payload.assignedRoom);

            await RoomStudent.findOneAndUpdate(
                { room: payload.assignedRoom },
                { $addToSet: { students: allocation.student } },
                { upsert: true, session },
            );
        }

        const result = await RoomAllocation.findByIdAndUpdate(id, updateData, {
            new: true,
            session,
        }).populate('student assignedRoom approvedBy');

        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

export const RoomServices = {
    createRoomIntoDB,
    getAllRoomsFromDB,
    getSingleRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB,
    assignStudentsWithRoomIntoDB,
    removeStudentsFromRoomFromDB,
    createRoomAllocationIntoDB,
    getAllRoomAllocationsFromDB,
    approveRoomAllocationIntoDB,
};