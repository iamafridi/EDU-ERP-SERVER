import { createBaseController } from '../../base/base.controller';
import { LabTechnicianServices } from './labTechnician.service';

export const LabTechnicianControllers = createBaseController(LabTechnicianServices, 'LabTechnician');
