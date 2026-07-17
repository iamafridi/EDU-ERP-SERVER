import z from 'zod';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from './user.constant';
import { DOMAIN_ADMIN_TYPES, STAFF_CATEGORIES, STAFF_SUB_ROLES } from '../../../shared/roles';

const userValidationSchema = z.object({
  password: z
    .string({ message: 'Password needs to be a string' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(128, { message: 'Password cannot be more than 128 characters' })
    .optional(),
});

const updateUserSchema = z.object({
  role: z.enum([...USER_ROLE_ENUM] as [string, ...string[]]).optional(),
  domainAdminType: z.enum([...DOMAIN_ADMIN_TYPES] as [string, ...string[]]).optional(),
  staffCategory: z.enum([...STAFF_CATEGORIES] as [string, ...string[]]).optional(),
  staffSubRole: z.enum([...STAFF_SUB_ROLES] as [string, ...string[]]).optional(),
  status: z.enum([...USER_STATUS_ENUM] as [string, ...string[]]).optional(),
});

const userIdParamSchema = z.object({
  userId: z.string({ message: 'userId must be a string' }),
});

export const userValidation = {
  userValidationSchema,
  updateUserSchema,
  userIdParamSchema,
};
