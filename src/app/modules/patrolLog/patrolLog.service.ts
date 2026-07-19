import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PatrolLogSearchableFields } from './patrolLog.constant';
import { TPatrolLog } from './patrolLog.interface';
import { PatrolLog } from './patrolLog.model';

const createPatrolLogIntoDB = async (payload: TPatrolLog) => {
    const result = await PatrolLog.create(payload);
    return result;
};

const getAllPatrolLogsFromDB = async (query: Record<string, unknown>) => {
    const patrolLogQuery = new QueryBuilder(
        PatrolLog.find().populate('guard'),
        query,
    )
        .search(PatrolLogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const data = await patrolLogQuery.modelQuery;
    const meta = await patrolLogQuery.countTotal();
    return { data, meta };
};

const getSinglePatrolLogFromDB = async (id: string) => {
    const result = await PatrolLog.findById(id).populate('guard');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Patrol log not found');
    }
    return result;
};

const updatePatrolLogIntoDB = async (id: string, payload: Partial<TPatrolLog>) => {
    const result = await PatrolLog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Patrol log not found');
    }
    return result;
};

const deletePatrolLogFromDB = async (id: string) => {
    const result = await PatrolLog.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Patrol log not found');
    }
    return result;
};

export const PatrolLogServices = {
    createPatrolLogIntoDB,
    getAllPatrolLogsFromDB,
    getSinglePatrolLogFromDB,
    updatePatrolLogIntoDB,
    deletePatrolLogFromDB,
};
