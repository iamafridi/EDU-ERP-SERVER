import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CurriculumControllers } from './curriculum.controller';
import { CurriculumValidations } from './curriculum.validation';

const router = express.Router();

router.post(
    '/course-outcomes/create',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.createCourseOutcomeValidationSchema),
    CurriculumControllers.createCourseOutcome,
);
router.get(
    '/course-outcomes',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getAllCourseOutcomes,
);
router.get(
    '/course-outcomes/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getSingleCourseOutcome,
);
router.patch(
    '/course-outcomes/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.updateCourseOutcomeValidationSchema),
    CurriculumControllers.updateCourseOutcome,
);
router.delete(
    '/course-outcomes/:id',
    auth('super-admin', 'domain-admin'),
    CurriculumControllers.deleteCourseOutcome,
);

router.post(
    '/program-outcomes/create',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.createProgramOutcomeValidationSchema),
    CurriculumControllers.createProgramOutcome,
);
router.get(
    '/program-outcomes',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getAllProgramOutcomes,
);
router.get(
    '/program-outcomes/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getSingleProgramOutcome,
);
router.patch(
    '/program-outcomes/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.updateProgramOutcomeValidationSchema),
    CurriculumControllers.updateProgramOutcome,
);
router.delete(
    '/program-outcomes/:id',
    auth('super-admin', 'domain-admin'),
    CurriculumControllers.deleteProgramOutcome,
);

router.post(
    '/maps/create',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.createCurriculumMapValidationSchema),
    CurriculumControllers.createCurriculumMap,
);
router.get(
    '/maps',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getAllCurriculumMaps,
);
router.get(
    '/maps/:id',
    auth('super-admin', 'domain-admin', 'faculty', 'student'),
    CurriculumControllers.getSingleCurriculumMap,
);
router.patch(
    '/maps/:id',
    auth('super-admin', 'domain-admin'),
    validateRequest(CurriculumValidations.updateCurriculumMapValidationSchema),
    CurriculumControllers.updateCurriculumMap,
);
router.delete(
    '/maps/:id',
    auth('super-admin', 'domain-admin'),
    CurriculumControllers.deleteCurriculumMap,
);

router.get(
    '/co-po-matrix/:curriculumMapId',
    auth('super-admin', 'domain-admin', 'faculty'),
    CurriculumControllers.getCOPOMatrix,
);

router.get(
    '/coverage-report/:curriculumMapId',
    auth('super-admin', 'domain-admin'),
    CurriculumControllers.getCoverageReport,
);

export const CurriculumRoutes = router;
