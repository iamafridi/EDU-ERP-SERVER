import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ParentControllers } from './parent.controller';
import { ParentValidations } from './parent.validation';

const router = express.Router();

router.post(
    '/create-parent',
    auth('super-admin', 'domain-admin'),
    validateRequest(ParentValidations.createParentValidationSchema),
    ParentControllers.createParent,
);
router.get(
    '/',
    auth('super-admin', 'domain-admin', 'faculty', 'staff'),
    ParentControllers.getAllParents,
);
router.get(
    '/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    ParentControllers.getSingleParent,
);
router.get(
    '/user/:userId',
    auth('super-admin', 'domain-admin', 'staff'),
    ParentControllers.getParentByUser,
);
router.patch(
    '/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(ParentValidations.updateParentValidationSchema),
    ParentControllers.updateParent,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ParentControllers.deleteParent,
);

export const ParentRoutes = router;
