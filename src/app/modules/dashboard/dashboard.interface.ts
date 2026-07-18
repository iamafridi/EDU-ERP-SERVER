export type TDashboardMetric = {
    label: string;
    value: number;
    change?: number;
};

export type TDashboardData = {
    metrics: TDashboardMetric[];
    charts?: Record<string, unknown>;
};
