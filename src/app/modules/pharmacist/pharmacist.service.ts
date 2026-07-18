import { createBaseService } from '../../base/base.service';
import { PharmacistSearchableFields } from './pharmacist.constant';
import { Pharmacist } from './pharmacist.model';

export const PharmacistServices = createBaseService(Pharmacist, PharmacistSearchableFields, 'Pharmacist');
