import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { SkillLabSearchableFields } from './skillLab.constant';
import { TSkillLab } from './skillLab.interface';
import { SkillLab } from './skillLab.model';

const createSkillLabIntoDB = async (payload: TSkillLab) => {
    const result = await SkillLab.create(payload);
    return result;
};

const getAllSkillLabsFromDB = async (query: Record<string, unknown>) => {
    const skillQuery = new QueryBuilder(
        SkillLab.find().populate('student assessedBy'),
        query,
    )
        .search(SkillLabSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await skillQuery.modelQuery;
    const meta = await skillQuery.countTotal();
    return { data, meta };
};

const getSingleSkillLabFromDB = async (id: string) => {
    const result = await SkillLab.findById(id).populate('student assessedBy');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Skill lab record not found');
    return result;
};

const updateSkillLabIntoDB = async (id: string, payload: Partial<TSkillLab>) => {
    if (payload.status === 'achieved' && !payload.assessedDate) {
        payload.assessedDate = new Date();
    }
    const result = await SkillLab.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Skill lab record not found');
    return result;
};

const deleteSkillLabFromDB = async (id: string) => {
    const result = await SkillLab.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Skill lab record not found');
    return result;
};

export const SkillLabServices = {
    createSkillLabIntoDB,
    getAllSkillLabsFromDB,
    getSingleSkillLabFromDB,
    updateSkillLabIntoDB,
    deleteSkillLabFromDB,
};
