import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { FeeStructureControllers } from './feeStructure.controller';
import { FeeStructureValidations } from './feeStructure.validation';

const router = express.Router();

router.post(
    '/create-fee-structure',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(FeeStructureValidations.createFeeStructureValidationSchema),
    FeeStructureControllers.createFeeStructure,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    FeeStructureControllers.getAllFeeStructures,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    FeeStructureControllers.getSingleFeeStructure,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(FeeStructureValidations.updateFeeStructureValidationSchema),
    FeeStructureControllers.updateFeeStructure,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    FeeStructureControllers.deleteFeeStructure,
);

export const FeeStructureRoutes = router;
