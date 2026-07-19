import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BookSearchableFields } from './book.constant';
import { TBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (payload: TBook) => {
    const existing = await Book.findOne({ isbn: payload.isbn });
    if (existing) throw new AppError(httpStatus.CONFLICT, 'Book with this ISBN already exists');
    const result = await Book.create(payload);
    return result;
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
    const bookQuery = new QueryBuilder(Book.find(), query)
        .search(BookSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await bookQuery.modelQuery;
    const meta = await bookQuery.countTotal();
    return { data, meta };
};

const getSingleBookFromDB = async (id: string) => {
    const result = await Book.findById(id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    return result;
};

const updateBookIntoDB = async (id: string, payload: Partial<TBook>) => {
    const result = await Book.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    return result;
};

const deleteBookFromDB = async (id: string) => {
    const result = await Book.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    return result;
};

export const BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};
