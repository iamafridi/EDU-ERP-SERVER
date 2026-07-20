import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { FeeControllers } from './fee.controller';
import { FeeValidations } from './fee.validation';

const router = express.Router();

router.post(
    '/generate-fee',
    auth('staff', 'domain-admin', 'super-admin'),
    FeeControllers.generateFee,
);
router.post(
    '/bulk-generate',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(FeeValidations.bulkGenerateFeeValidationSchema),
    FeeControllers.bulkGenerateFee,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    FeeControllers.getAllFees,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    FeeControllers.getSingleFee,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(FeeValidations.updateFeeValidationSchema),
    FeeControllers.updateFee,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    FeeControllers.deleteFee,
);

export const FeeRoutes = router;
