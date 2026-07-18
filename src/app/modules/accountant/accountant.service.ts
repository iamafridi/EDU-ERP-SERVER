import { createBaseService } from '../../base/base.service';
import { AccountantSearchableFields } from './accountant.constant';
import { Accountant } from './accountant.model';

export const AccountantServices = createBaseService(Accountant, AccountantSearchableFields, 'Accountant');
