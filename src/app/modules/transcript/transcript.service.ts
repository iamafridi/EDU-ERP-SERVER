import httpStatus from 'http-status';
import crypto from 'crypto';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TTranscript } from './transcript.interface';
import { Transcript } from './transcript.model';
import { Grade } from '../grade/grade.model';

const createTranscriptIntoDB = async (payload: TTranscript) => {
    if (!payload.qrToken) {
        payload.qrToken = crypto.randomBytes(16).toString('hex');
    }
    payload.generatedAt = new Date();

    const result = await Transcript.create(payload);
    return result;
};

const generateTranscriptFromGrades = async (
    studentId: string,
    academicSemesterId: string,
) => {
    const grades = await Grade.find({
        student: studentId,
        academicSemester: academicSemesterId,
        isDeleted: false,
    }).populate('course');

    if (grades.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'No grades found for this semester');
    }

    let totalCredits = 0;
    let earnedCredits = 0;
    let totalGradePoints = 0;

    for (const g of grades) {
        const course = g.course as any;
        const credit = course.credit || 0;
        totalCredits += credit;
        if (g.gradePoint && g.gradePoint > 0) {
            earnedCredits += credit;
            totalGradePoints += g.gradePoint * credit;
        }
    }

    const sgpa = totalCredits > 0 ? Math.round((totalGradePoints / totalCredits) * 100) / 100 : 0;

    const payload: Partial<TTranscript> = {
        student: studentId as any,
        academicSemester: academicSemesterId as any,
        totalCredits,
        earnedCredits,
        sgpa,
        grades: grades.map((g) => g._id),
        generatedAt: new Date(),
        qrToken: crypto.randomBytes(16).toString('hex'),
    };

    const result = await Transcript.create(payload);
    return result;
};

const getAllTranscriptsFromDB = async (query: Record<string, unknown>) => {
    const transcriptQuery = new QueryBuilder(
        Transcript.find().populate('student academicSemester verifiedBy'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await transcriptQuery.modelQuery;
    const meta = await transcriptQuery.countTotal();
    return { data, meta };
};

const getSingleTranscriptFromDB = async (id: string) => {
    const result = await Transcript.findById(id).populate(
        'student academicSemester verifiedBy grades',
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Transcript not found');
    return result;
};

const verifyTranscriptIntoDB = async (id: string, verifiedBy: string) => {
    const result = await Transcript.findByIdAndUpdate(
        id,
        { verified: true, verifiedBy: verifiedBy as any },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Transcript not found');
    return result;
};

const deleteTranscriptFromDB = async (id: string) => {
    const result = await Transcript.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Transcript not found');
    return result;
};

export const TranscriptServices = {
    createTranscriptIntoDB,
    generateTranscriptFromGrades,
    getAllTranscriptsFromDB,
    getSingleTranscriptFromDB,
    verifyTranscriptIntoDB,
    deleteTranscriptFromDB,
};
