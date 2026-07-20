import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ScholarshipControllers } from './scholarship.controller';
import { ScholarshipValidations } from './scholarship.validation';

const router = express.Router();

router.post(
    '/create-scholarship',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(ScholarshipValidations.createScholarshipValidationSchema),
    ScholarshipControllers.createScholarship,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    ScholarshipControllers.getAllScholarships,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff', 'student'),
    ScholarshipControllers.getSingleScholarship,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'staff'),
    validateRequest(ScholarshipValidations.updateScholarshipValidationSchema),
    ScholarshipControllers.updateScholarship,
);
router.patch(
    '/:id/approve',
    auth('domain-admin', 'super-admin'),
    ScholarshipControllers.approveScholarship,
);
router.patch(
    '/:id/reject',
    auth('domain-admin', 'super-admin'),
    ScholarshipControllers.rejectScholarship,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ScholarshipControllers.deleteScholarship,
);

export const ScholarshipRoutes = router;
