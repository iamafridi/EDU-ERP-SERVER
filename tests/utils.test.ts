import httpStatus from 'http-status';
import AppError from '../src/app/errors/AppError';
import sendResponse from '../src/app/utils/sendResponse';
import catchAsync from '../src/app/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';

describe('AppError', () => {
    it('should create an AppError with correct status and message', () => {
        const err = new AppError(httpStatus.NOT_FOUND, 'Resource not found');
        expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
        expect(err.message).toBe('Resource not found');
        expect(err.stack).toBeDefined();
    });

    it('should preserve the prototype chain', () => {
        const err = new AppError(httpStatus.BAD_REQUEST, 'Bad request');
        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(AppError);
    });
});

describe('catchAsync', () => {
    it('should call the wrapped function with req, res, next', async () => {
        const fn = jest.fn();
        const wrapped = catchAsync(fn);
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();

        await wrapped(req, res, next);

        expect(fn).toHaveBeenCalledWith(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with error when the function rejects', async () => {
        const error = new Error('Something went wrong');
        const fn = jest.fn().mockRejectedValue(error);
        const wrapped = catchAsync(fn);
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();

        await wrapped(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('sendResponse', () => {
    it('should send a JSON response with correct structure', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus } as unknown as Response;

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Created successfully',
            data: { id: '123' },
        });

        expect(mockStatus).toHaveBeenCalledWith(httpStatus.CREATED);
        expect(mockJson).toHaveBeenCalledWith({
            success: true,
            message: 'Created successfully',
            meta: undefined,
            data: { id: '123' },
        });
    });

    it('should include meta when provided', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus } as unknown as Response;
        const meta = { page: 1, limit: 10, total: 100, totalPages: 10 };

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'List retrieved',
            meta,
            data: [],
        });

        expect(mockJson).toHaveBeenCalledWith({
            success: true,
            message: 'List retrieved',
            meta,
            data: [],
        });
    });
});
