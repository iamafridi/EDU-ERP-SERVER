import { model, Schema } from 'mongoose';
import { TCounselor } from './counselor.interface';
import { createProfileSchema } from '../../base/base.model';

const counselorSchema = createProfileSchema<TCounselor>({
  employeeId: { type: String },
  specialization: { type: String },
});

export const Counselor = model<TCounselor>('Counselor', counselorSchema);
