import { createBaseController } from '../../base/base.controller';
import { NurseServices } from './nurse.service';

export const NurseControllers = createBaseController(NurseServices, 'Nurse');
