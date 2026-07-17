import { Schema, model } from 'mongoose';
import { TTranscript } from './transcript.interface';

const transcriptSchema = new Schema<TTranscript>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        totalCredits: { type: Number, required: true },
        earnedCredits: { type: Number, required: true },
        sgpa: { type: Number },
        cgpa: { type: Number },
        grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
        generatedAt: { type: Date, default: Date.now },
        verified: { type: Boolean, default: false },
        verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        qrToken: { type: String },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

transcriptSchema.index({ student: 1 });

transcriptSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
transcriptSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Transcript = model<TTranscript>('Transcript', transcriptSchema);
