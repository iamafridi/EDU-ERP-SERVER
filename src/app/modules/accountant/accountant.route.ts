import { createProfileRoutes } from '../../base/base.route';
import { AccountantControllers } from './accountant.controller';
import { AccountantValidations } from './accountant.validation';

export const AccountantRoutes = createProfileRoutes({
  routePrefix: 'create-accountant',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: AccountantValidations.createAccountantValidationSchema,
  updateValidation: AccountantValidations.updateAccountantValidationSchema,
  controller: AccountantControllers,
});
