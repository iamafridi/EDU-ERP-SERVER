import { createBaseService } from '../../base/base.service';
import { LabTechnicianSearchableFields } from './labTechnician.constant';
import { LabTechnician } from './labTechnician.model';

export const LabTechnicianServices = createBaseService(LabTechnician, LabTechnicianSearchableFields, 'LabTechnician');
