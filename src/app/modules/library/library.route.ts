import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LibraryControllers } from './library.controller';
import { LibraryValidations } from './library.validation';

const router = express.Router();

router.post(
    '/issue',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(LibraryValidations.createLibraryIssueValidationSchema),
    LibraryControllers.issueBook,
);
router.patch(
    '/:id/return',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(LibraryValidations.returnBookValidationSchema),
    LibraryControllers.returnBook,
);
router.patch(
    '/:id/pay-fine',
    auth('staff', 'domain-admin', 'super-admin', 'student', 'faculty'),
    LibraryControllers.payFine,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student', 'faculty'),
    LibraryControllers.getAllLibraryIssues,
);
router.get(
    '/overdue',
    auth('staff', 'domain-admin', 'super-admin'),
    LibraryControllers.getOverdueIssues,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student', 'faculty'),
    LibraryControllers.getSingleLibraryIssue,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    LibraryControllers.deleteLibraryIssue,
);

export const LibraryRoutes = router;
