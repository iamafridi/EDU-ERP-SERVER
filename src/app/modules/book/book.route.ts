import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { BookControllers } from './book.controller';
import { BookValidations } from './book.validation';

const router = express.Router();

router.post(
    '/create-book',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(BookValidations.createBookValidationSchema),
    BookControllers.createBook,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student', 'faculty'),
    BookControllers.getAllBooks,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student', 'faculty'),
    BookControllers.getSingleBook,
);
router.patch(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin'),
    validateRequest(BookValidations.updateBookValidationSchema),
    BookControllers.updateBook,
);
router.delete(
    '/:id',
    auth('super-admin', 'domain-admin'),
    BookControllers.deleteBook,
);

export const BookRoutes = router;
