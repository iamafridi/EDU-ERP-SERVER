import { createBaseController } from '../../base/base.controller';
import { PharmacistServices } from './pharmacist.service';

export const PharmacistControllers = createBaseController(PharmacistServices, 'Pharmacist');
