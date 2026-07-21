import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CommitteeControllers } from './committee.controller';
import { CommitteeValidations } from './committee.validation';

const router = express.Router();

router.post(
    '/create-committee',
    auth('domain-admin', 'super-admin'),
    validateRequest(CommitteeValidations.createCommitteeValidationSchema),
    CommitteeControllers.createCommittee,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    CommitteeControllers.getAllCommittees,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student'),
    CommitteeControllers.getSingleCommittee,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(CommitteeValidations.updateCommitteeValidationSchema),
    CommitteeControllers.updateCommittee,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    CommitteeControllers.deleteCommittee,
);

export const CommitteeRoutes = router;
