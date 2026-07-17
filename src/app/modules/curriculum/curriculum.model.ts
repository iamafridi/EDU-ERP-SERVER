import { Schema, model } from 'mongoose';
import { TCourseOutcome, TProgramOutcome, TCurriculumMap, TCurriculumTopic } from './curriculum.interface';
import { CognitiveLevels } from './curriculum.constant';

const courseOutcomeSchema = new Schema<TCourseOutcome>(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        code: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        cognitiveLevel: { type: String, enum: CognitiveLevels, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

courseOutcomeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
courseOutcomeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const programOutcomeSchema = new Schema<TProgramOutcome>(
    {
        code: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

programOutcomeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
programOutcomeSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const curriculumTopicSchema = new Schema<TCurriculumTopic>(
    {
        title: { type: String, required: true, trim: true },
        hours: { type: Number, required: true },
        cos: [{ type: Schema.Types.ObjectId, ref: 'CourseOutcome' }],
    },
    { _id: true },
);

const curriculumMapSchema = new Schema<TCurriculumMap>(
    {
        academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        courseOutcomes: [{ type: Schema.Types.ObjectId, ref: 'CourseOutcome' }],
        topics: [curriculumTopicSchema],
        textbooks: [{ type: String, trim: true }],
        referenceBooks: [{ type: String, trim: true }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

curriculumMapSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
curriculumMapSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const CourseOutcome = model<TCourseOutcome>('CourseOutcome', courseOutcomeSchema);
export const ProgramOutcome = model<TProgramOutcome>('ProgramOutcome', programOutcomeSchema);
export const CurriculumMap = model<TCurriculumMap>('CurriculumMap', curriculumMapSchema);
