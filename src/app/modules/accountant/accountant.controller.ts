import { createBaseController } from '../../base/base.controller';
import { AccountantServices } from './accountant.service';

export const AccountantControllers = createBaseController(AccountantServices, 'Accountant');
