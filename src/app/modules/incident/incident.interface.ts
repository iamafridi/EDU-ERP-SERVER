import { Types } from 'mongoose';

export type TIncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type TIncidentStatus = 'reported' | 'investigating' | 'resolved' | 'closed';

export type TIncident = {
    title: string;
    description: string;
    severity: TIncidentSeverity;
    status: TIncidentStatus;
    location: string;
    reportedBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    photos?: string[];
    resolution?: string;
    resolvedAt?: Date;
    isDeleted: boolean;
};
