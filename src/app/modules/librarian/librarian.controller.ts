import { createBaseController } from '../../base/base.controller';
import { LibrarianServices } from './librarian.service';

export const LibrarianControllers = createBaseController(LibrarianServices, 'Librarian');
