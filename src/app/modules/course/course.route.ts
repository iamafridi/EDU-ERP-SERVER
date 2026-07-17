import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('super-admin', 'domain-admin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/:id',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  CourseControllers.getSingleCourse,
);
router.get(
  '/',
  auth('super-admin', 'domain-admin', 'faculty', 'student'),
  CourseControllers.getAllCourses,
);
router.put(
  '/:courseId/assign-faculties',
  auth('super-admin', 'domain-admin'),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth('super-admin', 'domain-admin'),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse,
);
router.patch(
  '/:id',
  auth('super-admin', 'domain-admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
