import { model, Schema } from 'mongoose';
import { TAccountant } from './accountant.interface';
import { createProfileSchema } from '../../base/base.model';

const accountantSchema = createProfileSchema<TAccountant>({
  employeeId: { type: String },
});

export const Accountant = model<TAccountant>('Accountant', accountantSchema);
