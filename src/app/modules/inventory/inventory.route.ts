import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { InventoryControllers } from './inventory.controller';
import { InventoryValidations } from './inventory.validation';

const router = express.Router();

router.post(
    '/create-inventory-item',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(InventoryValidations.createInventoryValidationSchema),
    InventoryControllers.createInventoryItem,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    InventoryControllers.getAllInventoryItems,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    InventoryControllers.getSingleInventoryItem,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(InventoryValidations.updateInventoryValidationSchema),
    InventoryControllers.updateInventoryItem,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    InventoryControllers.deleteInventoryItem,
);

export const InventoryRoutes = router;
