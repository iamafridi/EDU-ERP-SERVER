import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { HostelControllers } from './hostel.controller';
import { HostelValidations } from './hostel.validation';

const router = express.Router();

router.post(
    '/check-in',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(HostelValidations.createHostelValidationSchema),
    HostelControllers.createHostelRecord,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    HostelControllers.getAllHostelRecords,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    HostelControllers.getSingleHostelRecord,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(HostelValidations.updateHostelValidationSchema),
    HostelControllers.updateHostelRecord,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    HostelControllers.deleteHostelRecord,
);

export const HostelRoutes = router;
