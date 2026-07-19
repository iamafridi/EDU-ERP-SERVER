import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TLibraryIssue } from './library.interface';
import { Library } from './library.model';
import { Book } from '../book/book.model';

const issueBookIntoDB = async (payload: TLibraryIssue) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const book = await Book.findById(payload.book).session(session);
        if (!book) throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
        if (book.availableQuantity < 1) {
            throw new AppError(httpStatus.BAD_REQUEST, 'No copies available for issue');
        }

        const result = await Library.create([payload], { session });

        await Book.findByIdAndUpdate(
            payload.book,
            { availableQuantity: book.availableQuantity - 1 },
            { session },
        );

        await session.commitTransaction();
        session.endSession();
        return result[0];
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

const returnBookIntoDB = async (id: string, returnDate: Date, fine?: number) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const issue = await Library.findById(id).session(session);
        if (!issue) throw new AppError(httpStatus.NOT_FOUND, 'Library issue record not found');
        if (issue.status === 'returned') {
            throw new AppError(httpStatus.BAD_REQUEST, 'Book already returned');
        }

        issue.returnDate = returnDate;
        issue.status = 'returned';
        if (fine !== undefined) issue.fine = fine;
        await issue.save({ session });

        await Book.findByIdAndUpdate(
            issue.book,
            { $inc: { availableQuantity: 1 } },
            { session },
        );

        await session.commitTransaction();
        session.endSession();
        return issue;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

const payFineIntoDB = async (id: string) => {
    const issue = await Library.findById(id);
    if (!issue) throw new AppError(httpStatus.NOT_FOUND, 'Library issue record not found');
    if (issue.finePaid) throw new AppError(httpStatus.BAD_REQUEST, 'Fine already paid');

    issue.finePaid = true;
    await issue.save();
    return issue;
};

const getAllLibraryIssuesFromDB = async (query: Record<string, unknown>) => {
    const libraryQuery = new QueryBuilder(
        Library.find().populate('book borrower'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await libraryQuery.modelQuery;
    const meta = await libraryQuery.countTotal();
    return { data, meta };
};

const getSingleLibraryIssueFromDB = async (id: string) => {
    const result = await Library.findById(id).populate('book borrower');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Library issue record not found');
    return result;
};

const deleteLibraryIssueFromDB = async (id: string) => {
    const result = await Library.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Library issue record not found');
    return result;
};

const FINE_PER_DAY = 2;

const getOverdueIssuesFromDB = async () => {
    const now = new Date();
    const overdue = await Library.find({
        status: 'issued',
        dueDate: { $lt: now },
        isDeleted: false,
    }).populate('book borrower');

    return overdue.map((issue) => {
        const daysOverdue = Math.floor(
            (now.getTime() - new Date(issue.dueDate).getTime()) / (1000 * 60 * 60 * 24),
        );
        const fine = daysOverdue * FINE_PER_DAY;
        return {
            ...issue.toJSON(),
            daysOverdue,
            calculatedFine: fine,
        };
    });
};

export const LibraryServices = {
    issueBookIntoDB,
    returnBookIntoDB,
    payFineIntoDB,
    getAllLibraryIssuesFromDB,
    getSingleLibraryIssueFromDB,
    deleteLibraryIssueFromDB,
    getOverdueIssuesFromDB,
};
