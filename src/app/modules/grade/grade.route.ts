import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { GradeControllers } from './grade.controller';
import { GradeValidations } from './grade.validation';

const router = express.Router();

router.post(
    '/create-grade',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(GradeValidations.createGradeValidationSchema),
    GradeControllers.createGrade,
);
router.post(
    '/bulk-grades',
    auth('faculty', 'super-admin', 'domain-admin'),
    GradeControllers.bulkCreateGrades,
);
router.get(
    '/',
    auth('faculty', 'super-admin', 'domain-admin', 'student'),
    GradeControllers.getAllGrades,
);
router.get(
    '/:id',
    auth('faculty', 'super-admin', 'domain-admin', 'student'),
    GradeControllers.getSingleGrade,
);
router.patch(
    '/:id',
    auth('faculty', 'super-admin', 'domain-admin'),
    validateRequest(GradeValidations.updateGradeValidationSchema),
    GradeControllers.updateGrade,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    GradeControllers.deleteGrade,
);

export const GradeRoutes = router;
