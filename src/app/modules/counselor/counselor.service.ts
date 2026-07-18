import { createBaseService } from '../../base/base.service';
import { CounselorSearchableFields } from './counselor.constant';
import { Counselor } from './counselor.model';

export const CounselorServices = createBaseService(Counselor, CounselorSearchableFields, 'Counselor');
