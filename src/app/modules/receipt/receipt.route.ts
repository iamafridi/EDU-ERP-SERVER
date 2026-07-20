import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ReceiptControllers } from './receipt.controller';
import { ReceiptValidations } from './receipt.validation';

const router = express.Router();

router.post(
    '/create-receipt',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(ReceiptValidations.createReceiptValidationSchema),
    ReceiptControllers.createReceipt,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    ReceiptControllers.getAllReceipts,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    ReceiptControllers.getSingleReceipt,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ReceiptControllers.deleteReceipt,
);

export const ReceiptRoutes = router;
