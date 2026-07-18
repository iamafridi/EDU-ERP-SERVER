import { model, Schema } from 'mongoose';
import { TLabTechnician } from './labTechnician.interface';
import { createProfileSchema } from '../../base/base.model';

const labTechnicianSchema = createProfileSchema<TLabTechnician>({
  specialization: { type: String },
  qualification: { type: String },
});

export const LabTechnician = model<TLabTechnician>('LabTechnician', labTechnicianSchema);
