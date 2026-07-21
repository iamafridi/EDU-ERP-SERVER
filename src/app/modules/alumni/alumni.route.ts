import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AlumniControllers } from './alumni.controller';
import { AlumniValidations } from './alumni.validation';

const router = express.Router();

// Alumni profile
router.post(
    '/create-alumni',
    auth('domain-admin', 'super-admin'),
    validateRequest(AlumniValidations.createAlumniValidationSchema),
    AlumniControllers.createAlumni,
);
router.get(
    '/',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    AlumniControllers.getAllAlumni,
);

// Events
router.post(
    '/events',
    auth('domain-admin', 'super-admin'),
    validateRequest(AlumniValidations.createEventValidationSchema),
    AlumniControllers.createEvent,
);
router.get(
    '/events',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    AlumniControllers.getAllEvents,
);
router.get(
    '/events/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    AlumniControllers.getSingleEvent,
);
router.post(
    '/events/:eventId/register',
    auth('domain-admin', 'super-admin', 'student'),
    AlumniControllers.registerForEvent,
);
router.patch(
    '/events/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(AlumniValidations.updateEventValidationSchema),
    AlumniControllers.updateEvent,
);
router.delete(
    '/events/:id',
    auth('super-admin', 'domain-admin'),
    AlumniControllers.deleteEvent,
);

// Donations
router.post(
    '/donations',
    auth('domain-admin', 'super-admin', 'student'),
    validateRequest(AlumniValidations.createDonationValidationSchema),
    AlumniControllers.createDonation,
);
router.get(
    '/donations',
    auth('domain-admin', 'super-admin'),
    AlumniControllers.getAllDonations,
);
router.get(
    '/donations/total',
    auth('domain-admin', 'super-admin'),
    AlumniControllers.getTotalDonations,
);

router.get(
    '/:id',
    auth('domain-admin', 'super-admin', 'faculty', 'student', 'staff'),
    AlumniControllers.getSingleAlumni,
);
router.patch(
    '/:id',
    auth('domain-admin', 'super-admin'),
    validateRequest(AlumniValidations.updateAlumniValidationSchema),
    AlumniControllers.updateAlumni,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    AlumniControllers.deleteAlumni,
);

export const AlumniRoutes = router;
