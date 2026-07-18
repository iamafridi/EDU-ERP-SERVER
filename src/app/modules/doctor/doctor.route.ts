import { createProfileRoutes } from '../../base/base.route';
import { DoctorControllers } from './doctor.controller';
import { DoctorValidations } from './doctor.validation';

export const DoctorRoutes = createProfileRoutes({
  routePrefix: 'create-doctor',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: DoctorValidations.createDoctorValidationSchema,
  updateValidation: DoctorValidations.updateDoctorValidationSchema,
  controller: DoctorControllers,
});
