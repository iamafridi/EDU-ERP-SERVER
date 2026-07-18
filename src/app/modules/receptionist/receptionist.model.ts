import { model, Schema } from 'mongoose';
import { TReceptionist } from './receptionist.interface';
import { createProfileSchema } from '../../base/base.model';

const receptionistSchema = createProfileSchema<TReceptionist>({
  department: { type: String },
  shift: { type: String, enum: ['day', 'night', 'rotating'] },
});

export const Receptionist = model<TReceptionist>('Receptionist', receptionistSchema);
