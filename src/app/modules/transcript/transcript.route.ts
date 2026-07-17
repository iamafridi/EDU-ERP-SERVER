import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { TranscriptControllers } from './transcript.controller';
import { TranscriptValidations } from './transcript.validation';

const router = express.Router();

router.post(
    '/create-transcript',
    auth('domain-admin', 'super-admin'),
    validateRequest(TranscriptValidations.createTranscriptValidationSchema),
    TranscriptControllers.createTranscript,
);
router.post(
    '/generate',
    auth('domain-admin', 'super-admin'),
    TranscriptControllers.generateTranscript,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'student'),
    TranscriptControllers.getAllTranscripts,
);
router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'student'),
    TranscriptControllers.getSingleTranscript,
);
router.patch(
    '/:id/verify',
    auth('domain-admin', 'super-admin'),
    TranscriptControllers.verifyTranscript,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    TranscriptControllers.deleteTranscript,
);

export const TranscriptRoutes = router;
