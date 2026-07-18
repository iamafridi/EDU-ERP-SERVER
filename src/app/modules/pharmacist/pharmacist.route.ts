import { createProfileRoutes } from '../../base/base.route';
import { PharmacistControllers } from './pharmacist.controller';
import { PharmacistValidations } from './pharmacist.validation';

export const PharmacistRoutes = createProfileRoutes({
  routePrefix: 'create-pharmacist',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: PharmacistValidations.createPharmacistValidationSchema,
  updateValidation: PharmacistValidations.updatePharmacistValidationSchema,
  controller: PharmacistControllers,
});
