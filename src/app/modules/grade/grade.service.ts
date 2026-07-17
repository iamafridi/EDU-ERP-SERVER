import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { calculateGradeAndPoint } from './grade.constant';
import { TGrade } from './grade.interface';
import { Grade } from './grade.model';

const createGradeIntoDB = async (payload: TGrade) => {
    const percentage = (payload.marksObtained / payload.totalMarks) * 100;
    const { grade, gradePoint } = calculateGradeAndPoint(percentage);
    payload.grade = grade;
    payload.gradePoint = gradePoint;

    const result = await Grade.create(payload);
    return result;
};

const bulkCreateGradesIntoDB = async (records: TGrade[]) => {
    const enriched = records.map((r) => {
        const percentage = (r.marksObtained / r.totalMarks) * 100;
        const { grade, gradePoint } = calculateGradeAndPoint(percentage);
        return { ...r, grade, gradePoint };
    });
    const result = await Grade.insertMany(enriched, { ordered: false });
    return result;
};

const getAllGradesFromDB = async (query: Record<string, unknown>) => {
    const gradeQuery = new QueryBuilder(
        Grade.find().populate('student course exam academicSemester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await gradeQuery.modelQuery;
    const meta = await gradeQuery.countTotal();
    return { data, meta };
};

const getSingleGradeFromDB = async (id: string) => {
    const result = await Grade.findById(id).populate('student course exam academicSemester');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grade record not found');
    return result;
};

const updateGradeIntoDB = async (id: string, payload: Partial<TGrade>) => {
    if (payload.marksObtained !== undefined && payload.totalMarks !== undefined) {
        const percentage = (payload.marksObtained / payload.totalMarks) * 100;
        const { grade, gradePoint } = calculateGradeAndPoint(percentage);
        payload.grade = grade;
        payload.gradePoint = gradePoint;
    }
    const result = await Grade.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grade record not found');
    return result;
};

const deleteGradeFromDB = async (id: string) => {
    const result = await Grade.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grade record not found');
    return result;
};

export const GradeServices = {
    createGradeIntoDB,
    bulkCreateGradesIntoDB,
    getAllGradesFromDB,
    getSingleGradeFromDB,
    updateGradeIntoDB,
    deleteGradeFromDB,
};
