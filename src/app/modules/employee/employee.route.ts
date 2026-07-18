import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { EmployeeControllers } from './employee.controller';
import { EmployeeValidations } from './employee.validation';

const router = express.Router();

router.post(
    '/create-employee',
    auth('domain-admin', 'super-admin'),
    validateRequest(EmployeeValidations.createEmployeeValidationSchema),
    EmployeeControllers.createEmployee,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty'),
    EmployeeControllers.getAllEmployees,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty'),
    EmployeeControllers.getSingleEmployee,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(EmployeeValidations.updateEmployeeValidationSchema),
    EmployeeControllers.updateEmployee,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    EmployeeControllers.deleteEmployee,
);

export const EmployeeRoutes = router;
