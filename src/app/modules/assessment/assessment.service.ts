import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AssessmentSearchableFields, calculateGradeAndGPA } from './assessment.constant';
import { TAssessment, TAssessmentScore, TGradeBook } from './assessment.interface';
import { Assessment, AssessmentScore, GradeBook } from './assessment.model';

const createAssessmentIntoDB = async (payload: TAssessment) => {
    const result = await Assessment.create(payload);
    return result;
};

const getAllAssessmentsFromDB = async (query: Record<string, unknown>) => {
    const assessmentQuery = new QueryBuilder(
        Assessment.find().populate('course academicSemester'),
        query,
    )
        .search(AssessmentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await assessmentQuery.modelQuery;
    const meta = await assessmentQuery.countTotal();
    return { data, meta };
};

const getSingleAssessmentFromDB = async (id: string) => {
    const result = await Assessment.findById(id).populate('course academicSemester');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Assessment not found');
    return result;
};

const updateAssessmentIntoDB = async (id: string, payload: Partial<TAssessment>) => {
    const result = await Assessment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Assessment not found');
    return result;
};

const deleteAssessmentFromDB = async (id: string) => {
    const result = await Assessment.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Assessment not found');
    return result;
};

const createAssessmentScoreIntoDB = async (payload: TAssessmentScore) => {
    const result = await AssessmentScore.create(payload);
    return result;
};

const bulkCreateAssessmentScoresIntoDB = async (
    assessmentId: string,
    scores: { student: string; marksObtained: number; remarks?: string }[],
    gradedBy: string,
) => {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) throw new AppError(httpStatus.NOT_FOUND, 'Assessment not found');

    const scoreDocs = scores.map((s) => ({
        assessment: assessmentId,
        student: s.student,
        marksObtained: s.marksObtained,
        gradedBy,
        remarks: s.remarks,
    }));

    const results = await AssessmentScore.insertMany(scoreDocs);
    return results;
};

const getAssessmentScoresFromDB = async (query: Record<string, unknown>) => {
    const scoreQuery = new QueryBuilder(
        AssessmentScore.find().populate('assessment student gradedBy'),
        query,
    )
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await scoreQuery.modelQuery;
    const meta = await scoreQuery.countTotal();
    return { data, meta };
};

const calculateGradeForStudent = async (
    studentId: string,
    courseId: string,
    academicSemesterId: string,
) => {
    const assessments = await Assessment.find({ course: courseId, academicSemester: academicSemesterId });
    if (assessments.length === 0) throw new AppError(httpStatus.NOT_FOUND, 'No assessments found for this course');

    const scores = await AssessmentScore.find({
        assessment: { $in: assessments.map((a) => a._id) },
        student: studentId,
    }).populate('assessment');

    if (scores.length === 0) throw new AppError(httpStatus.NOT_FOUND, 'No scores found for this student');

    let totalWeightedMarks = 0;
    let totalWeightage = 0;
    const gradeBookEntries: { assessment: string; marksObtained: number; weightage: number }[] = [];

    for (const score of scores) {
        const assessment = assessments.find((a) => a._id.toString() === (score.assessment as any)._id?.toString());
        if (assessment) {
            const percentage = (score.marksObtained / assessment.maxMarks) * 100;
            const weighted = percentage * (assessment.weightage / 100);
            totalWeightedMarks += weighted;
            totalWeightage += assessment.weightage;
            gradeBookEntries.push({
                assessment: assessment._id.toString(),
                marksObtained: score.marksObtained,
                weightage: assessment.weightage,
            });
        }
    }

    const finalPercentage = totalWeightage > 0 ? totalWeightedMarks : 0;
    const { grade, gpa } = calculateGradeAndGPA(finalPercentage);

    const gradeBookData = {
        student: studentId,
        course: courseId,
        academicSemester: academicSemesterId,
        assessments: gradeBookEntries,
        totalMarks: finalPercentage,
        grade,
        gpa,
    };

    const result = await GradeBook.findOneAndUpdate(
        { student: studentId, course: courseId, academicSemester: academicSemesterId },
        gradeBookData,
        { upsert: true, new: true, runValidators: true },
    );

    return result;
};

const getGradeBooksFromDB = async (query: Record<string, unknown>) => {
    const gradeBookQuery = new QueryBuilder(
        GradeBook.find().populate('student course academicSemester assessments.assessment'),
        query,
    )
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await gradeBookQuery.modelQuery;
    const meta = await gradeBookQuery.countTotal();
    return { data, meta };
};

const getSingleGradeBookFromDB = async (id: string) => {
    const result = await GradeBook.findById(id)
        .populate('student course academicSemester assessments.assessment');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Grade book not found');
    return result;
};

const publishResultsIntoDB = async (courseId: string, academicSemesterId: string) => {
    const assessments = await Assessment.find({ course: courseId, academicSemester: academicSemesterId });
    if (assessments.length === 0) throw new AppError(httpStatus.NOT_FOUND, 'No assessments found');

    const allScores = await AssessmentScore.find({
        assessment: { $in: assessments.map((a) => a._id) },
    });

    const studentIds = [...new Set(allScores.map((s) => s.student.toString()))];
    const gradeBooks = [];

    for (const studentId of studentIds) {
        const result = await calculateGradeForStudent(studentId, courseId, academicSemesterId);
        gradeBooks.push(result);
    }

    return gradeBooks;
};

export const AssessmentServices = {
    createAssessmentIntoDB,
    getAllAssessmentsFromDB,
    getSingleAssessmentFromDB,
    updateAssessmentIntoDB,
    deleteAssessmentFromDB,
    createAssessmentScoreIntoDB,
    bulkCreateAssessmentScoresIntoDB,
    getAssessmentScoresFromDB,
    calculateGradeForStudent,
    getGradeBooksFromDB,
    getSingleGradeBookFromDB,
    publishResultsIntoDB,
};
