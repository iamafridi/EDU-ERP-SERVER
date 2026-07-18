import { createProfileRoutes } from '../../base/base.route';
import { NurseControllers } from './nurse.controller';
import { NurseValidations } from './nurse.validation';

export const NurseRoutes = createProfileRoutes({
  routePrefix: 'create-nurse',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: NurseValidations.createNurseValidationSchema,
  updateValidation: NurseValidations.updateNurseValidationSchema,
  controller: NurseControllers,
});
