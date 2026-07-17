export const GradeSearchableFields: string[] = [];

export const GradeScale: { min: number; grade: string; point: number }[] = [
    { min: 80, grade: 'A+', point: 4.00 },
    { min: 75, grade: 'A', point: 3.75 },
    { min: 70, grade: 'A-', point: 3.50 },
    { min: 65, grade: 'B+', point: 3.25 },
    { min: 60, grade: 'B', point: 3.00 },
    { min: 55, grade: 'B-', point: 2.75 },
    { min: 50, grade: 'C+', point: 2.50 },
    { min: 45, grade: 'C', point: 2.25 },
    { min: 40, grade: 'D', point: 2.00 },
    { min: 0, grade: 'F', point: 0.00 },
];

export const calculateGradeAndPoint = (percentage: number) => {
    for (const scale of GradeScale) {
        if (percentage >= scale.min) return { grade: scale.grade, gradePoint: scale.point };
    }
    return { grade: 'F', gradePoint: 0.00 };
};
