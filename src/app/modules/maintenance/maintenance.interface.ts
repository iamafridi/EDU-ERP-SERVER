import { Types } from 'mongoose';

export type TMaintenance = {
    id: string;
    user: Types.ObjectId;
    name: { firstName: string; middleName?: string; lastName: string };
    email: string;
    contactNo: string;
    trade?: string;
    employeeId?: string;
    profileImg?: string;
    isDeleted: boolean;
};

export type TComplaintPriority = 'low' | 'medium' | 'high' | 'emergency';
export type TComplaintStatus = 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';

export type TMaintenanceComplaint = {
    title: string;
    description: string;
    location: string;
    reportedBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    priority: TComplaintPriority;
    status: TComplaintStatus;
    resolutionNotes?: string;
    resolvedAt?: Date;
    isDeleted: boolean;
};
