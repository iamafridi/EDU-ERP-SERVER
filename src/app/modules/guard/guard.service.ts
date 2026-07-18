import { createBaseService } from '../../base/base.service';
import { GuardSearchableFields } from './guard.constant';
import { Guard } from './guard.model';

export const GuardServices = createBaseService(Guard, GuardSearchableFields, 'Guard');
