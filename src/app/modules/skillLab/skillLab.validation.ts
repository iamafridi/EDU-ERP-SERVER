import { z } from 'zod';
import { SkillStatuses } from './skillLab.constant';

const createSkillLabValidationSchema = z.object({
    body: z.object({
        student: z.string({ message: 'Student ID is required' }),
        skillName: z.string({ message: 'Skill name is required' }).min(1),
        category: z.string({ message: 'Category is required' }).min(1),
        assessedBy: z.string({ message: 'Assessor faculty ID is required' }),
        remarks: z.string().optional(),
    }),
});

const updateSkillLabValidationSchema = z.object({
    body: z.object({
        status: z.enum([...SkillStatuses] as [string, ...string[]]).optional(),
        remarks: z.string().optional(),
        assessedDate: z.string().datetime().optional(),
    }),
});

export const SkillLabValidations = {
    createSkillLabValidationSchema,
    updateSkillLabValidationSchema,
};
