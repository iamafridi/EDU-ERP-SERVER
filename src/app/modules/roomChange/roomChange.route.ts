import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { RoomChangeControllers } from './roomChange.controller';
import { RoomChangeValidations } from './roomChange.validation';

const router = express.Router();

router.post(
    '/create-room-change',
    auth('student', 'super-admin', 'domain-admin'),
    validateRequest(RoomChangeValidations.createRoomChangeValidationSchema),
    RoomChangeControllers.createRoomChange,
);
router.get(
    '/',
    auth('staff', 'super-admin', 'domain-admin'),
    RoomChangeControllers.getAllRoomChanges,
);
router.get(
    '/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    RoomChangeControllers.getSingleRoomChange,
);
router.patch(
    '/:id/approve',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(RoomChangeValidations.updateRoomChangeValidationSchema),
    RoomChangeControllers.approveRoomChange,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    RoomChangeControllers.deleteRoomChange,
);

export const RoomChangeRoutes = router;
