import { model, Schema } from 'mongoose';
import { TNurse } from './nurse.interface';
import { createProfileSchema } from '../../base/base.model';

const nurseSchema = createProfileSchema<TNurse>({
  department: { type: String },
  qualification: { type: String },
  shift: { type: String, enum: ['day', 'night', 'rotating'] },
});

export const Nurse = model<TNurse>('Nurse', nurseSchema);
