import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TimetableSearchableFields, TimetableDays, TIME_SLOTS } from './timetable.constant';
import { TTimetable, TTimetableEntry } from './timetable.interface';
import { Timetable } from './timetable.model';

const createTimetableIntoDB = async (payload: TTimetable) => {
    const existing = await Timetable.findOne({
        academicSemester: payload.academicSemester,
        department: payload.department,
        year: payload.year,
        section: payload.section,
        isDeleted: { $ne: true },
    });
    if (existing) {
        throw new AppError(httpStatus.CONFLICT, 'A timetable already exists for this semester/department/year/section');
    }
    const result = await Timetable.create(payload);
    return result;
};

const getAllTimetablesFromDB = async (query: Record<string, unknown>) => {
    const timetableQuery = new QueryBuilder(
        Timetable.find().populate('academicSemester department entries.course entries.faculty'),
        query,
    )
        .search(TimetableSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await timetableQuery.modelQuery;
    const meta = await timetableQuery.countTotal();
    return { data, meta };
};

const getSingleTimetableFromDB = async (id: string) => {
    const result = await Timetable.findById(id)
        .populate('academicSemester department entries.course entries.faculty');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');
    return result;
};

const updateTimetableIntoDB = async (id: string, payload: Partial<TTimetable>) => {
    const result = await Timetable.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');
    return result;
};

const deleteTimetableFromDB = async (id: string) => {
    const result = await Timetable.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');
    return result;
};

const addEntryToTimetableIntoDB = async (id: string, entry: TTimetableEntry) => {
    const timetable = await Timetable.findById(id);
    if (!timetable) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');

    const clash = timetable.entries.find(
        (e) =>
            e.day === entry.day &&
            ((entry.startTime >= e.startTime && entry.startTime < e.endTime) ||
                (entry.endTime > e.startTime && entry.endTime <= e.endTime) ||
                (entry.startTime <= e.startTime && entry.endTime >= e.endTime)) &&
            (e.room === entry.room || e.faculty.toString() === entry.faculty.toString()),
    );

    if (clash) {
        throw new AppError(
            httpStatus.CONFLICT,
            `Clash detected: ${clash.day} at ${clash.startTime}-${clash.endTime} (room: ${clash.room})`,
        );
    }

    timetable.entries.push(entry);
    const result = await timetable.save();
    return result;
};

const removeEntryFromTimetableIntoDB = async (id: string, entryId: string) => {
    const timetable = await Timetable.findById(id);
    if (!timetable) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');

    const entryIdx = timetable.entries.findIndex(
        (e) => e._id && e._id.toString() === entryId,
    );
    if (entryIdx === -1) throw new AppError(httpStatus.NOT_FOUND, 'Entry not found');

    timetable.entries.splice(entryIdx, 1);
    const result = await timetable.save();
    return result;
};

const generateGridFromDB = async (id: string) => {
    const timetable = await Timetable.findById(id)
        .populate('entries.course entries.faculty');
    if (!timetable) throw new AppError(httpStatus.NOT_FOUND, 'Timetable not found');

    const grid: Record<string, Record<string, any[]>> = {};

    for (const day of TimetableDays) {
        grid[day] = {};
        for (const slot of TIME_SLOTS) {
            grid[day][slot] = [];
        }
    }

    for (const entry of timetable.entries) {
        const startHour = parseInt(entry.startTime.split(':')[0], 10);
        const endHour = parseInt(entry.endTime.split(':')[0], 10);

        for (let h = startHour; h < endHour; h++) {
            const slotKey = `${h.toString().padStart(2, '0')}:00`;
            if (grid[entry.day] && grid[entry.day][slotKey]) {
                grid[entry.day][slotKey].push(entry);
            }
        }
    }

    return grid;
};

export const TimetableServices = {
    createTimetableIntoDB,
    getAllTimetablesFromDB,
    getSingleTimetableFromDB,
    updateTimetableIntoDB,
    deleteTimetableFromDB,
    addEntryToTimetableIntoDB,
    removeEntryFromTimetableIntoDB,
    generateGridFromDB,
};
