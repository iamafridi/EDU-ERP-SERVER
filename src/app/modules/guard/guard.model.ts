import { model, Schema } from 'mongoose';
import { TGuard } from './guard.interface';
import { createProfileSchema } from '../../base/base.model';

const guardSchema = createProfileSchema<TGuard>({
  shift: { type: String, enum: ['day', 'night', 'rotating'] },
  assignedGate: { type: String },
});

export const Guard = model<TGuard>('Guard', guardSchema);
