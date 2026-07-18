import { createBaseService } from '../../base/base.service';
import { LibrarianSearchableFields } from './librarian.constant';
import { Librarian } from './librarian.model';

export const LibrarianServices = createBaseService(Librarian, LibrarianSearchableFields, 'Librarian');
