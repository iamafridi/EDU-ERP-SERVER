import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TPayroll } from './payroll.interface';
import { Payroll } from './payroll.model';

const createPayrollIntoDB = async (payload: TPayroll) => {
    const existing = await Payroll.findOne({
        employee: payload.employee,
        month: payload.month,
        year: payload.year,
    });
    if (existing) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Payroll already exists for this employee in the given month/year',
        );
    }

    const allowanceTotal = Object.values(payload.allowances || {}).reduce(
        (sum, v) => sum + (v || 0),
        0,
    );
    const deductionTotal = Object.values(payload.deductions || {}).reduce(
        (sum, v) => sum + (v || 0),
        0,
    );

    payload.grossPay = payload.basicSalary + allowanceTotal;
    payload.totalDeductions = deductionTotal;
    payload.netPay = payload.grossPay - deductionTotal;

    const result = await Payroll.create(payload);
    return result;
};

const getAllPayrollsFromDB = async (query: Record<string, unknown>) => {
    const payrollQuery = new QueryBuilder(
        Payroll.find().populate('employee'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await payrollQuery.modelQuery;
    const meta = await payrollQuery.countTotal();
    return { data, meta };
};

const getSinglePayrollFromDB = async (id: string) => {
    const result = await Payroll.findById(id).populate('employee');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');
    return result;
};

const updatePayrollIntoDB = async (id: string, payload: Partial<TPayroll>) => {
    if (payload.allowances || payload.basicSalary) {
        const existing = await Payroll.findById(id);
        if (!existing) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');

        const basicSalary = payload.basicSalary ?? existing.basicSalary;
        const allowances = { ...existing.allowances, ...(payload.allowances || {}) };
        const deductions = { ...existing.deductions, ...(payload.deductions || {}) };

        const allowanceTotal = Object.values(allowances).reduce(
            (sum, v) => sum + (v || 0),
            0,
        );
        const deductionTotal = Object.values(deductions).reduce(
            (sum, v) => sum + (v || 0),
            0,
        );

        payload.grossPay = basicSalary + allowanceTotal;
        payload.totalDeductions = deductionTotal;
        payload.netPay = payload.grossPay - deductionTotal;
    }

    const result = await Payroll.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');
    return result;
};

const deletePayrollFromDB = async (id: string) => {
    const result = await Payroll.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');
    return result;
};

const markPayrollPaidIntoDB = async (id: string, paymentDate: Date) => {
    const result = await Payroll.findByIdAndUpdate(
        id,
        { status: 'paid', paymentDate },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');
    return result;
};

const getSalarySlipFromDB = async (id: string) => {
    const payroll = await Payroll.findById(id).populate('employee');
    if (!payroll) throw new AppError(httpStatus.NOT_FOUND, 'Payroll record not found');

    const allowanceTotal = Object.values(payroll.allowances || {}).reduce(
        (sum, v) => sum + (v || 0),
        0,
    );
    const deductionTotal = Object.values(payroll.deductions || {}).reduce(
        (sum, v) => sum + (v || 0),
        0,
    );

    return {
        id: payroll._id,
        employee: payroll.employee,
        month: payroll.month,
        year: payroll.year,
        basicSalary: payroll.basicSalary,
        allowances: {
            ...payroll.allowances,
            total: allowanceTotal,
        },
        deductions: {
            ...payroll.deductions,
            total: deductionTotal,
        },
        grossPay: payroll.grossPay,
        totalDeductions: payroll.totalDeductions,
        netPay: payroll.netPay,
        status: payroll.status,
        paymentDate: payroll.paymentDate,
    };
};

export const PayrollServices = {
    createPayrollIntoDB,
    getAllPayrollsFromDB,
    getSinglePayrollFromDB,
    updatePayrollIntoDB,
    deletePayrollFromDB,
    markPayrollPaidIntoDB,
    getSalarySlipFromDB,
};
