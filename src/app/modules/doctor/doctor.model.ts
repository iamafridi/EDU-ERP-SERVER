import { model, Schema } from 'mongoose';
import { TDoctor } from './doctor.interface';
import { createProfileSchema } from '../../base/base.model';

const doctorSchema = createProfileSchema<TDoctor>({
  specialization: { type: String },
  licenseNumber: { type: String },
});

export const Doctor = model<TDoctor>('Doctor', doctorSchema);
