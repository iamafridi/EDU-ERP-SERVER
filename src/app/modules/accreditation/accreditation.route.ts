import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AccreditationControllers } from './accreditation.controller';
import { AccreditationValidations } from './accreditation.validation';

const router = express.Router();

router.post(
    '/create-accreditation',
    auth('domain-admin', 'super-admin'),
    validateRequest(AccreditationValidations.createAccreditationValidationSchema),
    AccreditationControllers.createAccreditation,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin'),
    AccreditationControllers.getAllAccreditations,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin'),
    AccreditationControllers.getSingleAccreditation,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(AccreditationValidations.updateAccreditationValidationSchema),
    AccreditationControllers.updateAccreditation,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    AccreditationControllers.deleteAccreditation,
);

export const AccreditationRoutes = router;
