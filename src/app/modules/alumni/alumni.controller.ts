import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AlumniServices } from './alumni.service';

const createAlumni = catchAsync(async (req, res) => {
    const result = await AlumniServices.createAlumniIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Alumni created successfully',
        data: result,
    });
});

const getAllAlumni = catchAsync(async (req, res) => {
    const { data, meta } = await AlumniServices.getAllAlumniFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Alumni retrieved successfully',
        meta,
        data,
    });
});

const getSingleAlumni = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.getSingleAlumniFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Alumni retrieved successfully',
        data: result,
    });
});

const updateAlumni = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.updateAlumniIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Alumni updated successfully',
        data: result,
    });
});

const deleteAlumni = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.deleteAlumniFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Alumni deleted successfully',
        data: result,
    });
});

// Events
const createEvent = catchAsync(async (req, res) => {
    const payload = { ...req.body, organizer: req.user?.userId };
    const result = await AlumniServices.createEventIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Event created successfully',
        data: result,
    });
});

const getAllEvents = catchAsync(async (req, res) => {
    const { data, meta } = await AlumniServices.getAllEventsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Events retrieved successfully',
        meta,
        data,
    });
});

const getSingleEvent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.getSingleEventFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event retrieved successfully',
        data: result,
    });
});

const registerForEvent = catchAsync(async (req, res) => {
    const { eventId } = req.params;
    const { alumniId } = req.body;
    const result = await AlumniServices.registerForEventIntoDB(eventId, alumniId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Registered for event successfully',
        data: result,
    });
});

const updateEvent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.updateEventIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event updated successfully',
        data: result,
    });
});

const deleteEvent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AlumniServices.deleteEventFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event deleted successfully',
        data: result,
    });
});

// Donations
const createDonation = catchAsync(async (req, res) => {
    const result = await AlumniServices.createDonationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Donation recorded successfully',
        data: result,
    });
});

const getAllDonations = catchAsync(async (req, res) => {
    const { data, meta } = await AlumniServices.getAllDonationsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Donations retrieved successfully',
        meta,
        data,
    });
});

const getTotalDonations = catchAsync(async (req, res) => {
    const result = await AlumniServices.getTotalDonationsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Total donations retrieved successfully',
        data: result,
    });
});

export const AlumniControllers = {
    createAlumni,
    getAllAlumni,
    getSingleAlumni,
    updateAlumni,
    deleteAlumni,
    createEvent,
    getAllEvents,
    getSingleEvent,
    registerForEvent,
    updateEvent,
    deleteEvent,
    createDonation,
    getAllDonations,
    getTotalDonations,
};
