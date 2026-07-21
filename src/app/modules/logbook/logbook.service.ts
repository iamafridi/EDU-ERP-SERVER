import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { LogbookSearchableFields, CompetencyLevels } from './logbook.constant';
import { TClinicalProcedure, TLogEntry } from './logbook.interface';
import { ClinicalProcedure, LogEntry } from './logbook.model';
import mongoose from 'mongoose';

const createClinicalProcedureIntoDB = async (payload: TClinicalProcedure) => {
    const result = await ClinicalProcedure.create(payload);
    return result;
};

const getAllClinicalProceduresFromDB = async (query: Record<string, unknown>) => {
    const procedureQuery = new QueryBuilder(
        ClinicalProcedure.find(),
        query,
    )
        .search(['code', 'name'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await procedureQuery.modelQuery;
    const meta = await procedureQuery.countTotal();
    return { data, meta };
};

const getSingleClinicalProcedureFromDB = async (id: string) => {
    const result = await ClinicalProcedure.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Procedure not found');
    return result;
};

const updateClinicalProcedureIntoDB = async (id: string, payload: Partial<TClinicalProcedure>) => {
    const result = await ClinicalProcedure.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Procedure not found');
    return result;
};

const deleteClinicalProcedureFromDB = async (id: string) => {
    const result = await ClinicalProcedure.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Procedure not found');
    return result;
};

const createLogEntryIntoDB = async (payload: TLogEntry) => {
    const result = await LogEntry.create(payload);
    return result;
};

const getAllLogEntriesFromDB = async (query: Record<string, unknown>) => {
    const logQuery = new QueryBuilder(
        LogEntry.find().populate('student procedure supervisor'),
        query,
    )
        .search(LogbookSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await logQuery.modelQuery;
    const meta = await logQuery.countTotal();
    return { data, meta };
};

const getStudentLogEntriesFromDB = async (studentId: string) => {
    const result = await LogEntry.find({ student: studentId })
        .populate('procedure supervisor')
        .sort({ date: -1 });
    return result;
};

const updateLogEntryIntoDB = async (id: string, payload: Partial<TLogEntry>) => {
    const result = await LogEntry.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Log entry not found');
    return result;
};

const deleteLogEntryFromDB = async (id: string) => {
    const result = await LogEntry.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Log entry not found');
    return result;
};

const getStudentSummaryFromDB = async (studentId: string) => {
    const procedures = await ClinicalProcedure.find();

    const summary = await LogEntry.aggregate([
        { $match: { student: new mongoose.Types.ObjectId(studentId), isDeleted: { $ne: true } } },
        {
            $group: {
                _id: '$procedure',
                totalLogs: { $sum: 1 },
                observed: { $sum: { $cond: [{ $eq: ['$competency', 'observed'] }, 1, 0] } },
                assisted: { $sum: { $cond: [{ $eq: ['$competency', 'assisted'] }, 1, 0] } },
                performed: { $sum: { $cond: [{ $eq: ['$competency', 'performed'] }, 1, 0] } },
                competent: { $sum: { $cond: [{ $eq: ['$competency', 'competent'] }, 1, 0] } },
            },
        },
    ]);

    const result = procedures.map((proc) => {
        const procSummary = summary.find(
            (s) => s._id.toString() === proc._id.toString(),
        );

        return {
            procedure: proc,
            totalLogs: procSummary?.totalLogs || 0,
            byCompetency: {
                observed: procSummary?.observed || 0,
                assisted: procSummary?.assisted || 0,
                performed: procSummary?.performed || 0,
                competent: procSummary?.competent || 0,
            },
            minimumRequired: proc.minimumRequired,
            met: (procSummary?.totalLogs || 0) >= proc.minimumRequired,
        };
    });

    return result;
};

const signOffLogEntryIntoDB = async (id: string) => {
    const result = await LogEntry.findByIdAndUpdate(
        id,
        { supervisorSignOff: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Log entry not found');
    return result;
};

export const LogbookServices = {
    createClinicalProcedureIntoDB,
    getAllClinicalProceduresFromDB,
    getSingleClinicalProcedureFromDB,
    updateClinicalProcedureIntoDB,
    deleteClinicalProcedureFromDB,
    createLogEntryIntoDB,
    getAllLogEntriesFromDB,
    getStudentLogEntriesFromDB,
    updateLogEntryIntoDB,
    deleteLogEntryFromDB,
    getStudentSummaryFromDB,
    signOffLogEntryIntoDB,
};
