import { createProfileRoutes } from '../../base/base.route';
import { LabTechnicianControllers } from './labTechnician.controller';
import { LabTechnicianValidations } from './labTechnician.validation';

export const LabTechnicianRoutes = createProfileRoutes({
  routePrefix: 'create-lab-technician',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: LabTechnicianValidations.createLabTechnicianValidationSchema,
  updateValidation: LabTechnicianValidations.updateLabTechnicianValidationSchema,
  controller: LabTechnicianControllers,
});
