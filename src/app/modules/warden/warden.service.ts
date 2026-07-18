import { createBaseService } from '../../base/base.service';
import { WardenSearchableFields } from './warden.constant';
import { Warden } from './warden.model';

export const WardenServices = createBaseService(Warden, WardenSearchableFields, 'Warden');
