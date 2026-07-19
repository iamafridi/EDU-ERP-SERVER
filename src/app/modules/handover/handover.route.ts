import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { HandoverControllers } from './handover.controller';
import { HandoverValidations } from './handover.validation';

const router = express.Router();

router.post(
    '/create-handover',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(HandoverValidations.createHandoverValidationSchema),
    HandoverControllers.createHandover,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    HandoverControllers.getAllHandovers,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    HandoverControllers.getSingleHandover,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(HandoverValidations.updateHandoverValidationSchema),
    HandoverControllers.updateHandover,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    HandoverControllers.deleteHandover,
);

export const HandoverRoutes = router;
