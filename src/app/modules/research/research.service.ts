import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ResearchSearchableFields } from './research.constant';
import { TResearch } from './research.interface';
import { Research } from './research.model';

const createResearchIntoDB = async (payload: TResearch) => {
    const result = await Research.create(payload);
    return result;
};

const getAllResearchFromDB = async (query: Record<string, unknown>) => {
    const researchQuery = new QueryBuilder(
        Research.find().populate('authors'),
        query,
    )
        .search(ResearchSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await researchQuery.modelQuery;
    const meta = await researchQuery.countTotal();
    return { data, meta };
};

const getSingleResearchFromDB = async (id: string) => {
    const result = await Research.findById(id).populate('authors');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Research record not found');
    return result;
};

const updateResearchIntoDB = async (id: string, payload: Partial<TResearch>) => {
    const result = await Research.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Research record not found');
    return result;
};

const deleteResearchFromDB = async (id: string) => {
    const result = await Research.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Research record not found');
    return result;
};

export const ResearchServices = {
    createResearchIntoDB,
    getAllResearchFromDB,
    getSingleResearchFromDB,
    updateResearchIntoDB,
    deleteResearchFromDB,
};
