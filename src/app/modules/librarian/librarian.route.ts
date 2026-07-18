import { createProfileRoutes } from '../../base/base.route';
import { LibrarianControllers } from './librarian.controller';
import { LibrarianValidations } from './librarian.validation';

export const LibrarianRoutes = createProfileRoutes({
  routePrefix: 'create-librarian',
  createRoles: ['super-admin', 'domain-admin'],
  readRoles: ['super-admin', 'domain-admin', 'staff'],
  updateRoles: ['super-admin', 'domain-admin', 'staff'],
  deleteRoles: ['super-admin', 'domain-admin'],
  createValidation: LibrarianValidations.createLibrarianValidationSchema,
  updateValidation: LibrarianValidations.updateLibrarianValidationSchema,
  controller: LibrarianControllers,
});
