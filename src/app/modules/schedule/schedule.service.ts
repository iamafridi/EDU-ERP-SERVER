import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ScheduleSearchableFields } from './schedule.constant';
import { TSchedule, TAcademicCalendarEvent } from './schedule.interface';
import { Schedule, AcademicCalendarEvent } from './schedule.model';

const createScheduleIntoDB = async (payload: TSchedule) => {
    const clash = await Schedule.findOne({
        day: payload.day,
        faculty: payload.faculty,
        $or: [
            { startTime: { $lt: payload.endTime, $gte: payload.startTime } },
            { endTime: { $gt: payload.startTime, $lte: payload.endTime } },
            { startTime: { $lte: payload.startTime }, endTime: { $gte: payload.endTime } },
        ],
        isDeleted: false,
    });
    if (clash) {
        throw new AppError(httpStatus.CONFLICT, 'Schedule clash detected for this faculty');
    }

    const roomClash = await Schedule.findOne({
        day: payload.day,
        room: payload.room,
        $or: [
            { startTime: { $lt: payload.endTime, $gte: payload.startTime } },
            { endTime: { $gt: payload.startTime, $lte: payload.endTime } },
            { startTime: { $lte: payload.startTime }, endTime: { $gte: payload.endTime } },
        ],
        isDeleted: false,
    });
    if (roomClash) {
        throw new AppError(httpStatus.CONFLICT, 'Schedule clash detected for this room');
    }

    const result = await Schedule.create(payload);
    return result;
};

const getAllSchedulesFromDB = async (query: Record<string, unknown>) => {
    const scheduleQuery = new QueryBuilder(
        Schedule.find().populate('course faculty academicDepartment academicSemester'),
        query,
    )
        .search(ScheduleSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await scheduleQuery.modelQuery;
    const meta = await scheduleQuery.countTotal();
    return { data, meta };
};

const getSingleScheduleFromDB = async (id: string) => {
    const result = await Schedule.findById(id).populate(
        'course faculty academicDepartment academicSemester',
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
    return result;
};

const updateScheduleIntoDB = async (id: string, payload: Partial<TSchedule>) => {
    const result = await Schedule.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
    return result;
};

const deleteScheduleFromDB = async (id: string) => {
    const result = await Schedule.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
    return result;
};

const createCalendarEventIntoDB = async (payload: TAcademicCalendarEvent) => {
    const result = await AcademicCalendarEvent.create(payload);
    return result;
};

const getAllCalendarEventsFromDB = async (query: Record<string, unknown>) => {
    const eventQuery = new QueryBuilder(AcademicCalendarEvent.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await eventQuery.modelQuery;
    const meta = await eventQuery.countTotal();
    return { data, meta };
};

const updateCalendarEventIntoDB = async (
    id: string,
    payload: Partial<TAcademicCalendarEvent>,
) => {
    const result = await AcademicCalendarEvent.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Calendar event not found');
    return result;
};

const deleteCalendarEventFromDB = async (id: string) => {
    const result = await AcademicCalendarEvent.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Calendar event not found');
    return result;
};

export const ScheduleServices = {
    createScheduleIntoDB,
    getAllSchedulesFromDB,
    getSingleScheduleFromDB,
    updateScheduleIntoDB,
    deleteScheduleFromDB,
    createCalendarEventIntoDB,
    getAllCalendarEventsFromDB,
    updateCalendarEventIntoDB,
    deleteCalendarEventFromDB,
};
