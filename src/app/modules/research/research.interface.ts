import { Types } from 'mongoose';

export type TResearchType = 'publication' | 'project' | 'grant' | 'presentation';
export type TResearchStatus = 'submitted' | 'under-review' | 'accepted' | 'published' | 'completed';

export type TResearch = {
    title: string;
    authors: Types.ObjectId[];
    type: TResearchType;
    status: TResearchStatus;
    abstract?: string;
    journal?: string;
    doi?: string;
    grantAmount?: number;
    startDate?: Date;
    endDate?: Date;
    isDeleted: boolean;
};
