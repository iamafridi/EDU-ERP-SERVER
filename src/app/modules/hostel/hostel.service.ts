import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { THostelCheckIn } from './hostel.interface';
import { Hostel } from './hostel.model';

const createHostelIntoDB = async (payload: THostelCheckIn) => {
    const existing = await Hostel.findOne({ student: payload.student });
    if (existing) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Student already has a hostel record',
        );
    }
    const result = await Hostel.create(payload);
    return result;
};

const getAllHostelRecordsFromDB = async (query: Record<string, unknown>) => {
    const hostelQuery = new QueryBuilder(
        Hostel.find().populate('student room'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await hostelQuery.modelQuery;
    const meta = await hostelQuery.countTotal();
    return { data, meta };
};

const getSingleHostelRecordFromDB = async (id: string) => {
    const result = await Hostel.findById(id).populate('student room');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Hostel record not found');
    }
    return result;
};

const updateHostelRecordIntoDB = async (
    id: string,
    payload: Partial<THostelCheckIn>,
) => {
    const result = await Hostel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Hostel record not found');
    }
    return result;
};

const deleteHostelRecordFromDB = async (id: string) => {
    const result = await Hostel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Hostel record not found');
    }
    return result;
};

export const HostelServices = {
    createHostelIntoDB,
    getAllHostelRecordsFromDB,
    getSingleHostelRecordFromDB,
    updateHostelRecordIntoDB,
    deleteHostelRecordFromDB,
};
