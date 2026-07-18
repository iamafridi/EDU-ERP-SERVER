import { TBaseProfile } from '../../base/base.interface';

export type TGuard = TBaseProfile & {
  shift?: 'day' | 'night' | 'rotating';
  assignedGate?: string;
};
