import { createProfileRoutes } from '../../base/base.route';
import { CounselorControllers } from './counselor.controller';
import { CounselorValidations } from './counselor.validation';

export const CounselorRoutes = createProfileRoutes({
  routePrefix: 'create-counselor',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: CounselorValidations.createCounselorValidationSchema,
  updateValidation: CounselorValidations.updateCounselorValidationSchema,
  controller: CounselorControllers,
});
