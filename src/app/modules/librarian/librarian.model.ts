import { model, Schema } from 'mongoose';
import { TLibrarian } from './librarian.interface';
import { createProfileSchema } from '../../base/base.model';

const librarianSchema = createProfileSchema<TLibrarian>({
  employeeId: { type: String },
});

export const Librarian = model<TLibrarian>('Librarian', librarianSchema);
