import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GlobalSearchServices } from './globalSearch.service';

const search = catchAsync(async (req, res) => {
  const query = (req.query.q as string) || '';
  const results = await GlobalSearchServices.searchAll(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search results retrieved successfully',
    data: { results },
  });
});

export const GlobalSearchControllers = {
  search,
};
