import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AssessmentControllers } from './assessment.controller';
import { AssessmentValidations } from './assessment.validation';

const router = express.Router();

router.post(
    '/create',
    auth('super-admin', 'domain-admin', 'faculty'),
    validateRequest(AssessmentValidations.createAssessmentValidationSchema),
    AssessmentControllers.createAssessment,
);
router.get(
    '/',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    AssessmentControllers.getAllAssessments,
);
router.post(
    '/scores/create',
    auth('super-admin', 'domain-admin', 'faculty'),
    validateRequest(AssessmentValidations.createAssessmentScoreValidationSchema),
    AssessmentControllers.createAssessmentScore,
);
router.post(
    '/scores/bulk-create',
    auth('super-admin', 'domain-admin', 'faculty'),
    validateRequest(AssessmentValidations.bulkCreateAssessmentScoreValidationSchema),
    AssessmentControllers.bulkCreateAssessmentScores,
);
router.get(
    '/scores',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    AssessmentControllers.getAssessmentScores,
);

router.get(
    '/grade-books',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    AssessmentControllers.getGradeBooks,
);
router.get(
    '/grade-books/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    AssessmentControllers.getSingleGradeBook,
);
router.get(
    '/calculate-grade/:studentId/:courseId/:academicSemesterId',
    auth('super-admin', 'domain-admin', 'faculty'),
    AssessmentControllers.calculateGrade,
);
router.get(
    '/publish-results/:courseId/:academicSemesterId',
    auth('super-admin', 'domain-admin'),
    AssessmentControllers.publishResults,
);

router.get(
    '/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    AssessmentControllers.getSingleAssessment,
);
router.patch(
    '/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(AssessmentValidations.updateAssessmentValidationSchema),
    AssessmentControllers.updateAssessment,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    AssessmentControllers.deleteAssessment,
);

export const AssessmentRoutes = router;
