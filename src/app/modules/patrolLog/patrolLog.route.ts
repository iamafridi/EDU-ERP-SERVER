import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PatrolLogControllers } from './patrolLog.controller';
import { PatrolLogValidations } from './patrolLog.validation';

const router = express.Router();

router.post(
    '/create-patrol-log',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(PatrolLogValidations.createPatrolLogValidationSchema),
    PatrolLogControllers.createPatrolLog,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    PatrolLogControllers.getAllPatrolLogs,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    PatrolLogControllers.getSinglePatrolLog,
);
router.patch(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(PatrolLogValidations.updatePatrolLogValidationSchema),
    PatrolLogControllers.updatePatrolLog,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    PatrolLogControllers.deletePatrolLog,
);

export const PatrolLogRoutes = router;
