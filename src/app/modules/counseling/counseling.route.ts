import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CounselingControllers } from './counseling.controller';
import { CounselingValidations } from './counseling.validation';

const router = express.Router();

router.post(
    '/create-session',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(CounselingValidations.createCounselingValidationSchema),
    CounselingControllers.createCounseling,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    CounselingControllers.getAllCounselings,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    CounselingControllers.getSingleCounseling,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(CounselingValidations.updateCounselingValidationSchema),
    CounselingControllers.updateCounseling,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    CounselingControllers.deleteCounseling,
);

export const CounselingRoutes = router;
