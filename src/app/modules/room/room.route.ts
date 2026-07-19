import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomControllers } from './room.controller';
import { RoomValidations } from './room.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-room',
  auth('super-admin', 'domain-admin', 'staff'),
  validateRequest(RoomValidations.createRoomValidationSchema),
  RoomControllers.createRoom,
);
router.get(
  '/',
  auth('super-admin', 'domain-admin', 'staff', 'student'),
  RoomControllers.getAllRooms,
);

router.post(
  '/allocations/create-allocation',
  auth('student', 'super-admin', 'domain-admin', 'staff'),
  validateRequest(RoomValidations.createRoomAllocationValidationSchema),
  RoomControllers.createRoomAllocation,
);
router.get(
  '/allocations',
  auth('staff', 'super-admin', 'domain-admin'),
  RoomControllers.getAllRoomAllocations,
);
router.patch(
  '/allocations/:id/approve',
  auth('staff', 'super-admin', 'domain-admin'),
  validateRequest(RoomValidations.approveRoomAllocationValidationSchema),
  RoomControllers.approveRoomAllocation,
);

router.get(
  '/:id',
  auth('super-admin', 'domain-admin', 'staff', 'student'),
  RoomControllers.getSingleRoom,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin', 'staff'),
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom,
);
router.delete(
  '/:id',
  auth('super-admin', 'domain-admin'),
  RoomControllers.deleteRoom,
);
router.put(
  '/:roomId/assign-students',
  auth('super-admin', 'domain-admin', 'staff'),
  validateRequest(RoomValidations.studentsWithRoomValidationSchema),
  RoomControllers.assignStudentsWithRoom,
);
router.delete(
  '/:roomId/remove-students',
  auth('super-admin', 'domain-admin', 'staff'),
  validateRequest(RoomValidations.studentsWithRoomValidationSchema),
  RoomControllers.removeStudentsFromRoom,
);

export const RoomRoutes = router;
