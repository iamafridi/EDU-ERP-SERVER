import { z } from 'zod';
import { CommitteeTypes } from './committee.constant';

const committeeMemberSchema = z.object({
    member: z.string({ message: 'Member ID is required' }),
    role: z.string({ message: 'Role is required' }).min(1),
});

const createCommitteeValidationSchema = z.object({
    body: z.object({
        name: z.string({ message: 'Name is required' }).min(1),
        type: z.enum([...CommitteeTypes] as [string, ...string[]]),
        members: z.array(committeeMemberSchema).optional(),
        description: z.string().optional(),
        convenor: z.string({ message: 'Convenor ID is required' }),
    }),
});

const updateCommitteeValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        type: z.enum([...CommitteeTypes] as [string, ...string[]]).optional(),
        members: z.array(committeeMemberSchema).optional(),
        description: z.string().optional(),
        convenor: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
});

export const CommitteeValidations = {
    createCommitteeValidationSchema,
    updateCommitteeValidationSchema,
};
