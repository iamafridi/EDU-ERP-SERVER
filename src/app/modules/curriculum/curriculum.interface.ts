import { Types } from 'mongoose';

export type TCognitiveLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export type TCourseOutcome = {
    course: Types.ObjectId;
    code: string;
    description: string;
    cognitiveLevel: TCognitiveLevel;
    isDeleted: boolean;
};

export type TProgramOutcome = {
    code: string;
    description: string;
    isDeleted: boolean;
};

export type TCurriculumTopic = {
    title: string;
    hours: number;
    cos: Types.ObjectId[];
};

export type TCurriculumMap = {
    academicSemester: Types.ObjectId;
    course: Types.ObjectId;
    courseOutcomes: Types.ObjectId[];
    topics: TCurriculumTopic[];
    textbooks: string[];
    referenceBooks: string[];
    isDeleted: boolean;
};

export type TCOPOMatrix = {
    courseOutcome: Types.ObjectId;
    programOutcome: Types.ObjectId;
    mapped: boolean;
};
