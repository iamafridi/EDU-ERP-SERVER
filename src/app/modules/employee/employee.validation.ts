import { z } from 'zod';
import { EmploymentTypes } from './employee.constant';

const createEmployeeValidationSchema = z.object({
    body: z.object({
        employeeId: z.string({ message: 'Employee ID is required' }).min(1),
        firstName: z.string({ message: 'First name is required' }).min(1),
        lastName: z.string({ message: 'Last name is required' }).min(1),
        email: z.string({ message: 'Email is required' }).email(),
        phone: z.string().optional(),
        department: z.string().optional(),
        designation: z.string({ message: 'Designation is required' }).min(1),
        employmentType: z.enum([...EmploymentTypes] as [string, ...string[]]),
        joiningDate: z.string().datetime(),
        salary: z.number().min(0).optional(),
        address: z.string().optional(),
        photo: z.string().optional(),
    }),
});

const updateEmployeeValidationSchema = z.object({
    body: z.object({
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        phone: z.string().optional(),
        department: z.string().optional(),
        designation: z.string().min(1).optional(),
        employmentType: z.enum([...EmploymentTypes] as [string, ...string[]]).optional(),
        salary: z.number().min(0).optional(),
        address: z.string().optional(),
        photo: z.string().optional(),
    }),
});

export const EmployeeValidations = {
    createEmployeeValidationSchema,
    updateEmployeeValidationSchema,
};
