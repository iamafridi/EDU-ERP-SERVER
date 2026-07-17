import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import {
    CourseOutcomeSearchableFields,
    ProgramOutcomeSearchableFields,
} from './curriculum.constant';
import { TCourseOutcome, TProgramOutcome, TCurriculumMap } from './curriculum.interface';
import { CourseOutcome, ProgramOutcome, CurriculumMap } from './curriculum.model';

const createCourseOutcomeIntoDB = async (payload: TCourseOutcome) => {
    const result = await CourseOutcome.create(payload);
    return result;
};

const getAllCourseOutcomesFromDB = async (query: Record<string, unknown>) => {
    const courseOutcomeQuery = new QueryBuilder(
        CourseOutcome.find().populate('course'),
        query,
    )
        .search(CourseOutcomeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await courseOutcomeQuery.modelQuery;
    const meta = await courseOutcomeQuery.countTotal();
    return { data, meta };
};

const getSingleCourseOutcomeFromDB = async (id: string) => {
    const result = await CourseOutcome.findById(id).populate('course');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Course Outcome not found');
    return result;
};

const updateCourseOutcomeIntoDB = async (id: string, payload: Partial<TCourseOutcome>) => {
    const result = await CourseOutcome.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Course Outcome not found');
    return result;
};

const deleteCourseOutcomeFromDB = async (id: string) => {
    const result = await CourseOutcome.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Course Outcome not found');
    return result;
};

const createProgramOutcomeIntoDB = async (payload: TProgramOutcome) => {
    const result = await ProgramOutcome.create(payload);
    return result;
};

const getAllProgramOutcomesFromDB = async (query: Record<string, unknown>) => {
    const programOutcomeQuery = new QueryBuilder(
        ProgramOutcome.find(),
        query,
    )
        .search(ProgramOutcomeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await programOutcomeQuery.modelQuery;
    const meta = await programOutcomeQuery.countTotal();
    return { data, meta };
};

const getSingleProgramOutcomeFromDB = async (id: string) => {
    const result = await ProgramOutcome.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Program Outcome not found');
    return result;
};

const updateProgramOutcomeIntoDB = async (id: string, payload: Partial<TProgramOutcome>) => {
    const result = await ProgramOutcome.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Program Outcome not found');
    return result;
};

const deleteProgramOutcomeFromDB = async (id: string) => {
    const result = await ProgramOutcome.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Program Outcome not found');
    return result;
};

const createCurriculumMapIntoDB = async (payload: TCurriculumMap) => {
    const result = await CurriculumMap.create(payload);
    return result;
};

const getAllCurriculumMapsFromDB = async (query: Record<string, unknown>) => {
    const curriculumMapQuery = new QueryBuilder(
        CurriculumMap.find().populate('academicSemester course courseOutcomes topics.cos'),
        query,
    )
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await curriculumMapQuery.modelQuery;
    const meta = await curriculumMapQuery.countTotal();
    return { data, meta };
};

const getSingleCurriculumMapFromDB = async (id: string) => {
    const result = await CurriculumMap.findById(id)
        .populate('academicSemester course courseOutcomes topics.cos');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Curriculum Map not found');
    return result;
};

const updateCurriculumMapIntoDB = async (id: string, payload: Partial<TCurriculumMap>) => {
    const result = await CurriculumMap.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Curriculum Map not found');
    return result;
};

const deleteCurriculumMapFromDB = async (id: string) => {
    const result = await CurriculumMap.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Curriculum Map not found');
    return result;
};

const generateCOPOMatrixFromDB = async (curriculumMapId: string) => {
    const map = await CurriculumMap.findById(curriculumMapId)
        .populate('courseOutcomes');
    if (!map) throw new AppError(httpStatus.NOT_FOUND, 'Curriculum Map not found');

    const allPOs = await ProgramOutcome.find();
    const matrix: { co: any; poMappings: { po: any; mapped: boolean }[] }[] = [];

    for (const co of map.courseOutcomes) {
        const poMappings = allPOs.map((po) => ({
            po,
            mapped: true,
        }));
        matrix.push({ co, poMappings });
    }

    return matrix;
};

const getCoverageReportFromDB = async (curriculumMapId: string) => {
    const map = await CurriculumMap.findById(curriculumMapId)
        .populate('courseOutcomes topics.cos');
    if (!map) throw new AppError(httpStatus.NOT_FOUND, 'Curriculum Map not found');

    const totalHours = map.topics.reduce((sum, t) => sum + t.hours, 0);
    const coverage = map.courseOutcomes.map((co: any) => {
        const relatedTopics = map.topics.filter((t) =>
            t.cos.some((tc) => tc.toString() === co._id.toString()),
        );
        const coveredHours = relatedTopics.reduce((sum, t) => sum + t.hours, 0);
        const percentage = totalHours > 0 ? Math.round((coveredHours / totalHours) * 100) : 0;
        return {
            courseOutcome: co,
            relatedTopics: relatedTopics.map((t) => ({ title: t.title, hours: t.hours })),
            coveredHours,
            totalHours,
            coveragePercent: percentage,
        };
    });

    return coverage;
};

export const CurriculumServices = {
    createCourseOutcomeIntoDB,
    getAllCourseOutcomesFromDB,
    getSingleCourseOutcomeFromDB,
    updateCourseOutcomeIntoDB,
    deleteCourseOutcomeFromDB,
    createProgramOutcomeIntoDB,
    getAllProgramOutcomesFromDB,
    getSingleProgramOutcomeFromDB,
    updateProgramOutcomeIntoDB,
    deleteProgramOutcomeFromDB,
    createCurriculumMapIntoDB,
    getAllCurriculumMapsFromDB,
    getSingleCurriculumMapFromDB,
    updateCurriculumMapIntoDB,
    deleteCurriculumMapFromDB,
    generateCOPOMatrixFromDB,
    getCoverageReportFromDB,
};
