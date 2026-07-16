import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

export const createBaseController = <T>(services: {
  createIntoDB: (payload: T) => Promise<T>;
  getAllFromDB: (query: Record<string, unknown>) => Promise<{ data: T[]; meta: unknown }>;
  getSingleFromDB: (id: string) => Promise<T>;
  updateIntoDB: (id: string, payload: Partial<T>) => Promise<T>;
  deleteFromDB: (id: string) => Promise<T>;
}, name: string) => {
  const create = catchAsync(async (req, res) => {
    const result = await services.createIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: `${name} profile created successfully`,
      data: result,
    });
  });

  const getAll = catchAsync(async (req, res) => {
    const { data, meta } = await services.getAllFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${name}s retrieved successfully`,
      meta: meta as { page: number; limit: number; total: number; totalPages: number } | undefined,
      data,
    });
  });

  const getSingle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await services.getSingleFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${name} retrieved successfully`,
      data: result,
    });
  });

  const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await services.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${name} updated successfully`,
      data: result,
    });
  });

  const deleteItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await services.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${name} deleted successfully`,
      data: result,
    });
  });

  return {
    create,
    getAll,
    getSingle,
    update,
    delete: deleteItem,
  };
};
