import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { EmployeeSearchableFields } from './employee.constant';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';

const createEmployeeIntoDB = async (payload: TEmployee) => {
    const existing = await Employee.findOne({
        $or: [{ employeeId: payload.employeeId }, { email: payload.email }],
    });
    if (existing) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Employee with this ID or email already exists',
        );
    }
    const result = await Employee.create(payload);
    return result;
};

const getAllEmployeesFromDB = async (query: Record<string, unknown>) => {
    const employeeQuery = new QueryBuilder(
        Employee.find().populate('department'),
        query,
    )
        .search(EmployeeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await employeeQuery.modelQuery;
    const meta = await employeeQuery.countTotal();
    return { data, meta };
};

const getSingleEmployeeFromDB = async (id: string) => {
    const result = await Employee.findById(id).populate('department');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    return result;
};

const updateEmployeeIntoDB = async (id: string, payload: Partial<TEmployee>) => {
    const result = await Employee.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    return result;
};

const deleteEmployeeFromDB = async (id: string) => {
    const result = await Employee.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    return result;
};

export const EmployeeServices = {
    createEmployeeIntoDB,
    getAllEmployeesFromDB,
    getSingleEmployeeFromDB,
    updateEmployeeIntoDB,
    deleteEmployeeFromDB,
};
