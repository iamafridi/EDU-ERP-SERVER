import { Schema, model } from 'mongoose';
import { TLibraryIssue } from './library.interface';
import { LibraryIssueStatuses, BorrowerTypes } from './library.constant';

const libraryIssueSchema = new Schema<TLibraryIssue>(
    {
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        borrower: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        borrowerType: { type: String, enum: BorrowerTypes, required: true },
        issueDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        returnDate: { type: Date },
        status: { type: String, enum: LibraryIssueStatuses, default: 'issued' },
        fine: { type: Number, default: 0, min: 0 },
        finePaid: { type: Boolean, default: false },
        renewalCount: { type: Number, default: 0, min: 0 },
        remarks: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

libraryIssueSchema.index({ borrower: 1 });

libraryIssueSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
libraryIssueSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Library = model<TLibraryIssue>('Library', libraryIssueSchema);
