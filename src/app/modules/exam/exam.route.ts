import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ExamControllers } from './exam.controller';
import { ExamValidations } from './exam.validation';

const router = express.Router();

router.post(
    '/create-exam',
    auth('domain-admin', 'super-admin'),
    validateRequest(ExamValidations.createExamValidationSchema),
    ExamControllers.createExam,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ExamControllers.getAllExams,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ExamControllers.getSingleExam,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(ExamValidations.updateExamValidationSchema),
    ExamControllers.updateExam,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ExamControllers.deleteExam,
);

export const ExamRoutes = router;
