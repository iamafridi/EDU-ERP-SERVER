import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookServices } from './book.service';

const createBook = catchAsync(async (req, res) => {
    const result = await BookServices.createBookIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
});

const getAllBooks = catchAsync(async (req, res) => {
    const { data, meta } = await BookServices.getAllBooksFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Books retrieved successfully',
        meta,
        data,
    });
});

const getSingleBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookServices.getSingleBookFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
});

const updateBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookServices.updateBookIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
});

const deleteBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookServices.deleteBookFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book deleted successfully',
        data: result,
    });
});

export const BookControllers = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
