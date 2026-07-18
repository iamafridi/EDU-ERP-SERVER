import { createBaseController } from '../../base/base.controller';
import { WardenServices } from './warden.service';

export const WardenControllers = createBaseController(WardenServices, 'Warden');
