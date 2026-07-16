import httpStatus from 'http-status';
import { Model } from 'mongoose';
import QueryBuilder from '../builder/QueryBuilder';
import AppError from '../errors/AppError';

export const createBaseService = <T>(Model: Model<T>, searchableFields: string[], name: string) => {
  const createIntoDB = async (payload: T) => {
    const result = await Model.create(payload);
    return result;
  };

  const getAllFromDB = async (query: Record<string, unknown>) => {
    const modelQuery = new QueryBuilder(Model.find(), query)
      .search(searchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
    const data = await modelQuery.modelQuery;
    const meta = await modelQuery.countTotal();
    return { data, meta };
  };

  const getSingleFromDB = async (id: string) => {
    const result = await Model.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, `${name} not found`);
    return result;
  };

  const updateIntoDB = async (id: string, payload: Partial<T>) => {
    const result = await Model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, `${name} not found`);
    return result;
  };

  const deleteFromDB = async (id: string) => {
    const result = await Model.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, `${name} not found`);
    return result;
  };

  return {
    createIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateIntoDB,
    deleteFromDB,
  };
};
