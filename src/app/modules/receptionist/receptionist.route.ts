import { createProfileRoutes } from '../../base/base.route';
import { ReceptionistControllers } from './receptionist.controller';
import { ReceptionistValidations } from './receptionist.validation';

export const ReceptionistRoutes = createProfileRoutes({
  routePrefix: 'create-receptionist',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: ReceptionistValidations.createReceptionistValidationSchema,
  updateValidation: ReceptionistValidations.updateReceptionistValidationSchema,
  controller: ReceptionistControllers,
});
