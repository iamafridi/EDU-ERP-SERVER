import { Types } from 'mongoose';

export type TLibraryIssueStatus = 'issued' | 'returned' | 'overdue';

export type TLibraryIssue = {
    book: Types.ObjectId;
    borrower: Types.ObjectId;
    borrowerType: 'student' | 'faculty' | 'staff';
    issueDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: TLibraryIssueStatus;
    fine?: number;
    finePaid: boolean;
    renewalCount: number;
    remarks?: string;
    isDeleted: boolean;
};
