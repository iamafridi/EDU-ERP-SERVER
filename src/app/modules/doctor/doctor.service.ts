import { createBaseService } from '../../base/base.service';
import { DoctorSearchableFields } from './doctor.constant';
import { Doctor } from './doctor.model';

export const DoctorServices = createBaseService(Doctor, DoctorSearchableFields, 'Doctor');
