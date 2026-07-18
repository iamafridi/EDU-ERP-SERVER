import { createBaseController } from '../../base/base.controller';
import { GuardServices } from './guard.service';

export const GuardControllers = createBaseController(GuardServices, 'Guard');
