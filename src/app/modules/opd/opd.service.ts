import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { OPDSearchableFields } from './opd.constant';
import { TOPDAppointment, TOPDVisit } from './opd.interface';
import { OPDAppointment, OPDVisit } from './opd.model';

const createAppointmentIntoDB = async (payload: TOPDAppointment) => {
    const result = await OPDAppointment.create(payload);
    return result;
};

const getAllAppointmentsFromDB = async (query: Record<string, unknown>) => {
    const appointmentQuery = new QueryBuilder(
        OPDAppointment.find().populate('patientId doctorId'),
        query,
    )
        .search(['chiefComplaint'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await appointmentQuery.modelQuery;
    const meta = await appointmentQuery.countTotal();
    return { data, meta };
};

const getAppointmentsByDateFromDB = async (date: string) => {
    const result = await OPDAppointment.find({
        appointmentDate: new Date(date),
    }).populate('patientId doctorId').sort({ timeSlot: 1 });
    return result;
};

const updateAppointmentStatusIntoDB = async (id: string, payload: { status: string; notes?: string }) => {
    const result = await OPDAppointment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Appointment not found');
    return result;
};

const deleteAppointmentFromDB = async (id: string) => {
    const result = await OPDAppointment.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Appointment not found');
    return result;
};

const createVisitIntoDB = async (payload: TOPDVisit) => {
    const result = await OPDVisit.create(payload);
    // Update appointment status to consulted
    await OPDAppointment.findByIdAndUpdate(payload.appointmentId, { status: 'consulted' });
    return result;
};

const getAllVisitsFromDB = async (query: Record<string, unknown>) => {
    const visitQuery = new QueryBuilder(
        OPDVisit.find().populate('appointmentId patientId doctorId'),
        query,
    )
        .search(OPDSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await visitQuery.modelQuery;
    const meta = await visitQuery.countTotal();
    return { data, meta };
};

const getPatientVisitsFromDB = async (patientId: string) => {
    const result = await OPDVisit.find({ patientId })
        .populate('appointmentId doctorId')
        .sort({ createdAt: -1 });
    return result;
};

const updateVisitIntoDB = async (id: string, payload: Partial<TOPDVisit>) => {
    const result = await OPDVisit.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Visit not found');
    return result;
};

const deleteVisitFromDB = async (id: string) => {
    const result = await OPDVisit.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Visit not found');
    return result;
};

export const OPDServices = {
    createAppointmentIntoDB,
    getAllAppointmentsFromDB,
    getAppointmentsByDateFromDB,
    updateAppointmentStatusIntoDB,
    deleteAppointmentFromDB,
    createVisitIntoDB,
    getAllVisitsFromDB,
    getPatientVisitsFromDB,
    updateVisitIntoDB,
    deleteVisitFromDB,
};
