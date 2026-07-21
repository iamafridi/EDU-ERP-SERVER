import express from 'express';
import auth from '../../middlewares/auth';
import { GlobalSearchControllers } from './globalSearch.controller';

const router = express.Router();

router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student', 'staff'),
  GlobalSearchControllers.search,
);

export const GlobalSearchRoutes = router;
