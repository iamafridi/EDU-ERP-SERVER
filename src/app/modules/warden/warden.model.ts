import { model, Schema } from 'mongoose';
import { TWarden } from './warden.interface';
import { createProfileSchema } from '../../base/base.model';

const wardenSchema = createProfileSchema<TWarden>({
  assignedHostel: { type: String },
});

export const Warden = model<TWarden>('Warden', wardenSchema);
