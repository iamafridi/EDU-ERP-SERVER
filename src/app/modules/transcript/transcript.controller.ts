import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { TranscriptServices } from './transcript.service';

const createTranscript = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await TranscriptServices.createTranscriptIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Transcript created successfully',
        data: result,
    });
});

const generateTranscript = catchAsync(async (req, res) => {
    const student = req.user?.role === 'student' ? req.user.profileId : req.body.student;
    const { academicSemester } = req.body;
    const result = await TranscriptServices.generateTranscriptFromGrades(
        student,
        academicSemester,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transcript generated from grades successfully',
        data: result,
    });
});

const getAllTranscripts = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'transcript');
    const { data, meta } = await TranscriptServices.getAllTranscriptsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transcripts retrieved successfully',
        meta,
        data,
    });
});

const getSingleTranscript = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TranscriptServices.getSingleTranscriptFromDB(id);
    assertOwnership(req, result, 'transcript');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transcript retrieved successfully',
        data: result,
    });
});

const verifyTranscript = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TranscriptServices.verifyTranscriptIntoDB(
        id,
        req.user.userId,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transcript verified successfully',
        data: result,
    });
});

const deleteTranscript = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await TranscriptServices.getSingleTranscriptFromDB(id);
    assertOwnership(req, record, 'transcript');
    const result = await TranscriptServices.deleteTranscriptFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transcript deleted successfully',
        data: result,
    });
});

export const TranscriptControllers = {
    createTranscript,
    generateTranscript,
    getAllTranscripts,
    getSingleTranscript,
    verifyTranscript,
    deleteTranscript,
};
