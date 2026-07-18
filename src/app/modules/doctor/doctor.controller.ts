import { createBaseController } from '../../base/base.controller';
import { DoctorServices } from './doctor.service';

export const DoctorControllers = createBaseController(DoctorServices, 'Doctor');
