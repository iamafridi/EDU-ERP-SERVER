import { createBaseController } from '../../base/base.controller';
import { ReceptionistServices } from './receptionist.service';

export const ReceptionistControllers = createBaseController(ReceptionistServices, 'Receptionist');
