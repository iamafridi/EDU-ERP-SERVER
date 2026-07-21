export const AssessmentTypes: string[] = ['quiz', 'assignment', 'sessional', 'viva'];

export const AssessmentSearchableFields = ['title'];

export const GradeScale: { min: number; grade: string; gpa: number }[] = [
    { min: 90, grade: 'A+', gpa: 4.0 },
    { min: 85, grade: 'A', gpa: 4.0 },
    { min: 80, grade: 'A-', gpa: 3.7 },
    { min: 75, grade: 'B+', gpa: 3.3 },
    { min: 70, grade: 'B', gpa: 3.0 },
    { min: 65, grade: 'B-', gpa: 2.7 },
    { min: 60, grade: 'C+', gpa: 2.3 },
    { min: 55, grade: 'C', gpa: 2.0 },
    { min: 50, grade: 'C-', gpa: 1.7 },
    { min: 45, grade: 'D+', gpa: 1.3 },
    { min: 40, grade: 'D', gpa: 1.0 },
    { min: 0, grade: 'F', gpa: 0.0 },
];

export const calculateGradeAndGPA = (percentage: number): { grade: string; gpa: number } => {
    for (const scale of GradeScale) {
        if (percentage >= scale.min) return { grade: scale.grade, gpa: scale.gpa };
    }
    return { grade: 'F', gpa: 0.0 };
};
