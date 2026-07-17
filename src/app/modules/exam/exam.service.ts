import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ExamSearchableFields } from './exam.constant';
import { TExam } from './exam.interface';
import { Exam } from './exam.model';

const createExamIntoDB = async (payload: TExam) => {
    const result = await Exam.create(payload);
    return result;
};

const getAllExamsFromDB = async (query: Record<string, unknown>) => {
    const examQuery = new QueryBuilder(
        Exam.find().populate('course academicSemester'),
        query,
    )
        .search(ExamSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await examQuery.modelQuery;
    const meta = await examQuery.countTotal();
    return { data, meta };
};

const getSingleExamFromDB = async (id: string) => {
    const result = await Exam.findById(id).populate('course academicSemester');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Exam not found');
    return result;
};

const updateExamIntoDB = async (id: string, payload: Partial<TExam>) => {
    const result = await Exam.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Exam not found');
    return result;
};

const deleteExamFromDB = async (id: string) => {
    const result = await Exam.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Exam not found');
    return result;
};

export const ExamServices = {
    createExamIntoDB,
    getAllExamsFromDB,
    getSingleExamFromDB,
    updateExamIntoDB,
    deleteExamFromDB,
};
