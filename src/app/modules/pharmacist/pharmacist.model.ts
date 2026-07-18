import { model, Schema } from 'mongoose';
import { TPharmacist } from './pharmacist.interface';
import { createProfileSchema } from '../../base/base.model';

const pharmacistSchema = createProfileSchema<TPharmacist>({
  licenseNumber: { type: String },
  qualification: { type: String },
});

export const Pharmacist = model<TPharmacist>('Pharmacist', pharmacistSchema);
