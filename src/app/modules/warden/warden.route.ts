import { createProfileRoutes } from '../../base/base.route';
import { WardenControllers } from './warden.controller';
import { WardenValidations } from './warden.validation';

export const WardenRoutes = createProfileRoutes({
  routePrefix: 'create-warden',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: WardenValidations.createWardenValidationSchema,
  updateValidation: WardenValidations.updateWardenValidationSchema,
  controller: WardenControllers,
});
