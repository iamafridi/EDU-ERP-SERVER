import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { LibraryServices } from './library.service';

const issueBook = catchAsync(async (req, res) => {
    const result = await LibraryServices.issueBookIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book issued successfully',
        data: result,
    });
});

const returnBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await LibraryServices.getSingleLibraryIssueFromDB(id);
    assertOwnership(req, record, 'library');
    const returnDate = req.body.returnDate ? new Date(req.body.returnDate) : new Date();
    const result = await LibraryServices.returnBookIntoDB(id, returnDate, req.body.fine);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book returned successfully',
        data: result,
    });
});

const payFine = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await LibraryServices.getSingleLibraryIssueFromDB(id);
    assertOwnership(req, record, 'library');
    const result = await LibraryServices.payFineIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fine paid successfully',
        data: result,
    });
});

const getAllLibraryIssues = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'library');
    const { data, meta } = await LibraryServices.getAllLibraryIssuesFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Library issues retrieved successfully',
        meta,
        data,
    });
});

const getSingleLibraryIssue = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LibraryServices.getSingleLibraryIssueFromDB(id);
    assertOwnership(req, result, 'library');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Library issue retrieved successfully',
        data: result,
    });
});

const deleteLibraryIssue = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await LibraryServices.getSingleLibraryIssueFromDB(id);
    assertOwnership(req, record, 'library');
    const result = await LibraryServices.deleteLibraryIssueFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Library issue record deleted successfully',
        data: result,
    });
});

const getOverdueIssues = catchAsync(async (req, res) => {
    const result = await LibraryServices.getOverdueIssuesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Overdue issues retrieved successfully',
        data: result,
    });
});

export const LibraryControllers = {
    issueBook,
    returnBook,
    payFine,
    getAllLibraryIssues,
    getSingleLibraryIssue,
    deleteLibraryIssue,
    getOverdueIssues,
};
