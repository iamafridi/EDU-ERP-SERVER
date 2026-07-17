import { z } from 'zod';

const roleEnum = z.enum([
  'super-admin', 'chairman', 'principal', 'vice-principal',
  'registrar', 'hod', 'admin', 'faculty', 'student',
  'guard', 'warden', 'mess-manager', 'accountant',
  'librarian', 'doctor', 'counselor', 'maintenance', 'parent',
  'receptionist', 'nurse', 'lab-technician', 'pharmacist',
] as const);

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
    password: z.string({ message: 'Password is required' }),
    role: roleEnum.optional(),
  }),
});

const syncPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters')
      .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
      .refine((val) => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
      .refine((val) => /[0-9]/.test(val), 'Password must contain at least one number')
      .refine((val) => /[^A-Za-z0-9]/.test(val), 'Password must contain at least one special character'),
  }),
});

export const AuthValidations = {
  updateProfileValidationSchema,
  loginValidationSchema,
  syncPasswordValidationSchema,
};
