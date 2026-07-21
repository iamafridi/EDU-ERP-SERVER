import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { SkillLabControllers } from './skillLab.controller';
import { SkillLabValidations } from './skillLab.validation';

const router = express.Router();

router.post(
    '/create-skill-lab',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(SkillLabValidations.createSkillLabValidationSchema),
    SkillLabControllers.createSkillLab,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    SkillLabControllers.getAllSkillLabs,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    SkillLabControllers.getSingleSkillLab,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty'),
    validateRequest(SkillLabValidations.updateSkillLabValidationSchema),
    SkillLabControllers.updateSkillLab,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    SkillLabControllers.deleteSkillLab,
);

export const SkillLabRoutes = router;
