import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ResearchControllers } from './research.controller';
import { ResearchValidations } from './research.validation';

const router = express.Router();

router.post(
    '/create-research',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(ResearchValidations.createResearchValidationSchema),
    ResearchControllers.createResearch,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ResearchControllers.getAllResearch,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    ResearchControllers.getSingleResearch,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(ResearchValidations.updateResearchValidationSchema),
    ResearchControllers.updateResearch,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    ResearchControllers.deleteResearch,
);

export const ResearchRoutes = router;
