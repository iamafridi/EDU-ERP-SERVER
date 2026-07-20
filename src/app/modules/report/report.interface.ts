export type TReportFormat = 'pdf' | 'csv' | 'excel';
export type TReportStatus = 'generating' | 'ready' | 'failed';

export type TReport = {
    name: string;
    type: TReportFormat;
    status: TReportStatus;
    query: Record<string, unknown>;
    generatedBy: string;
    fileUrl?: string;
    isDeleted: boolean;
};
