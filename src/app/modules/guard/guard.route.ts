import { createProfileRoutes } from '../../base/base.route';
import { GuardControllers } from './guard.controller';
import { GuardValidations } from './guard.validation';

export const GuardRoutes = createProfileRoutes({
  routePrefix: 'create-guard',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: GuardValidations.createGuardValidationSchema,
  updateValidation: GuardValidations.updateGuardValidationSchema,
  controller: GuardControllers,
});
