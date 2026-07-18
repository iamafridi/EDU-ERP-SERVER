import { createBaseService } from '../../base/base.service';
import { ReceptionistSearchableFields } from './receptionist.constant';
import { Receptionist } from './receptionist.model';

export const ReceptionistServices = createBaseService(Receptionist, ReceptionistSearchableFields, 'Receptionist');
