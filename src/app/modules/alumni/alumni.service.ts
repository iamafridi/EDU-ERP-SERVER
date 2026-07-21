import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AlumniSearchableFields } from './alumni.constant';
import { TAlumni, TAlumniEvent, TAlumniDonation } from './alumni.interface';
import { Alumni, AlumniEvent, AlumniDonation } from './alumni.model';

// Alumni Profile
const createAlumniIntoDB = async (payload: TAlumni) => {
    const existing = await Alumni.findOne({ email: payload.email });
    if (existing) throw new AppError(httpStatus.CONFLICT, 'Alumni with this email already exists');
    const result = await Alumni.create(payload);
    return result;
};

const getAllAlumniFromDB = async (query: Record<string, unknown>) => {
    const alumniQuery = new QueryBuilder(
        Alumni.find().populate('department'),
        query,
    )
        .search(AlumniSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await alumniQuery.modelQuery;
    const meta = await alumniQuery.countTotal();
    return { data, meta };
};

const getSingleAlumniFromDB = async (id: string) => {
    const result = await Alumni.findById(id).populate('department');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Alumni not found');
    return result;
};

const updateAlumniIntoDB = async (id: string, payload: Partial<TAlumni>) => {
    const result = await Alumni.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Alumni not found');
    return result;
};

const deleteAlumniFromDB = async (id: string) => {
    const result = await Alumni.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Alumni not found');
    return result;
};

// Events
const createEventIntoDB = async (payload: TAlumniEvent) => {
    const result = await AlumniEvent.create(payload);
    return result;
};

const getAllEventsFromDB = async (query: Record<string, unknown>) => {
    const eventQuery = new QueryBuilder(
        AlumniEvent.find().populate('organizer', 'email role').populate('attendees'),
        query,
    )
        .search(AlumniSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await eventQuery.modelQuery;
    const meta = await eventQuery.countTotal();
    return { data, meta };
};

const getSingleEventFromDB = async (id: string) => {
    const result = await AlumniEvent.findById(id)
        .populate('organizer', 'email role')
        .populate('attendees');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    return result;
};

const registerForEventIntoDB = async (eventId: string, alumniId: string) => {
    const event = await AlumniEvent.findById(eventId);
    if (!event) throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Event is full');
    }
    if (event.attendees.some((a) => a.toString() === alumniId)) {
        throw new AppError(httpStatus.CONFLICT, 'Already registered for this event');
    }
    event.attendees.push(alumniId as any);
    await event.save();
    return event;
};

const updateEventIntoDB = async (id: string, payload: Partial<TAlumniEvent>) => {
    const result = await AlumniEvent.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    return result;
};

const deleteEventFromDB = async (id: string) => {
    const result = await AlumniEvent.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    return result;
};

// Donations
const createDonationIntoDB = async (payload: TAlumniDonation) => {
    const result = await AlumniDonation.create(payload);
    return result;
};

const getAllDonationsFromDB = async (query: Record<string, unknown>) => {
    const donationQuery = new QueryBuilder(
        AlumniDonation.find().populate('alumni'),
        query,
    )
        .search(AlumniSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await donationQuery.modelQuery;
    const meta = await donationQuery.countTotal();
    return { data, meta };
};

const getTotalDonationsFromDB = async () => {
    const result = await AlumniDonation.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    return result[0] || { total: 0, count: 0 };
};

export const AlumniServices = {
    createAlumniIntoDB,
    getAllAlumniFromDB,
    getSingleAlumniFromDB,
    updateAlumniIntoDB,
    deleteAlumniFromDB,
    createEventIntoDB,
    getAllEventsFromDB,
    getSingleEventFromDB,
    registerForEventIntoDB,
    updateEventIntoDB,
    deleteEventFromDB,
    createDonationIntoDB,
    getAllDonationsFromDB,
    getTotalDonationsFromDB,
};
