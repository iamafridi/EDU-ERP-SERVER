import { createBaseController } from '../../base/base.controller';
import { CounselorServices } from './counselor.service';

export const CounselorControllers = createBaseController(CounselorServices, 'Counselor');
