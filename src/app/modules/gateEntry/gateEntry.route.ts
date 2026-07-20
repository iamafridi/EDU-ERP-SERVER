import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { GateEntryControllers } from './gateEntry.controller';
import { GateEntryValidations } from './gateEntry.validation';

const router = express.Router();

router.post(
    '/create-gate-entry',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(GateEntryValidations.createGateEntryValidationSchema),
    GateEntryControllers.createGateEntry,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    GateEntryControllers.getAllGateEntries,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    GateEntryControllers.getSingleGateEntry,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(GateEntryValidations.updateGateEntryValidationSchema),
    GateEntryControllers.updateGateEntry,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    GateEntryControllers.deleteGateEntry,
);

export const GateEntryRoutes = router;
