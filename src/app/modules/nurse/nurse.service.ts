import { createBaseService } from '../../base/base.service';
import { NurseSearchableFields } from './nurse.constant';
import { Nurse } from './nurse.model';

export const NurseServices = createBaseService(Nurse, NurseSearchableFields, 'Nurse');
