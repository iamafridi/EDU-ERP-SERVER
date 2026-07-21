import { Schema, model } from 'mongoose';
import { TAssessment, TAssessmentScore, TGradeBook, TGradeBookEntry } from './assessment.interface';
import { AssessmentTypes } from './assessment.constant';

const assessmentSchema = new Schema<TAssessment>(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester', required: true },
        title: { type: String, required: true, trim: true },
        type: { type: String, enum: AssessmentTypes, required: true },
        maxMarks: { type: Number, required: true },
        weightage: { type: Number, required: true },
        date: { type: Date, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

assessmentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
assessmentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const assessmentScoreSchema = new Schema<TAssessmentScore>(
    {
        assessment: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        marksObtained: { type: Number, required: true },
        gradedBy: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

assessmentScoreSchema.index({ assessment: 1, student: 1 }, { unique: true });

assessmentScoreSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
assessmentScoreSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const gradeBookEntrySchema = new Schema<TGradeBookEntry>(
    {
        assessment: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
        marksObtained: { type: Number, required: true },
        weightage: { type: Number, required: true },
    },
    { _id: false },
);

const gradeBookSchema = new Schema<TGradeBook>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester', required: true },
        assessments: [gradeBookEntrySchema],
        totalMarks: { type: Number, default: 0 },
        grade: { type: String, default: 'F' },
        gpa: { type: Number, default: 0.0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

gradeBookSchema.index({ student: 1, course: 1, academicSemester: 1 }, { unique: true });

gradeBookSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
gradeBookSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Assessment = model<TAssessment>('Assessment', assessmentSchema);
export const AssessmentScore = model<TAssessmentScore>('AssessmentScore', assessmentScoreSchema);
export const GradeBook = model<TGradeBook>('GradeBook', gradeBookSchema);
