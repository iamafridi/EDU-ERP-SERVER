import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { MessControllers } from './mess.controller';
import { MessValidations } from './mess.validation';

const router = express.Router();

router.post(
    '/menus/create-menu',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(MessValidations.createMenuValidationSchema),
    MessControllers.createMenu,
);
router.get(
    '/menus',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    MessControllers.getAllMenus,
);
router.get(
    '/menus/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    MessControllers.getSingleMenu,
);
router.patch(
    '/menus/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(MessValidations.updateMenuValidationSchema),
    MessControllers.updateMenu,
);
router.delete(
    '/menus/:id',
    auth('super-admin', 'domain-admin'),
    MessControllers.deleteMenu,
);

router.post(
    '/meal-plans/create-plan',
    auth('student', 'staff', 'super-admin', 'domain-admin'),
    validateRequest(MessValidations.createMealPlanValidationSchema),
    MessControllers.createMealPlan,
);
router.get(
    '/meal-plans',
    auth('staff', 'super-admin', 'domain-admin'),
    MessControllers.getAllMealPlans,
);
router.get(
    '/meal-plans/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    MessControllers.getSingleMealPlan,
);
router.patch(
    '/meal-plans/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    validateRequest(MessValidations.updateMealPlanValidationSchema),
    MessControllers.updateMealPlan,
);

router.post(
    '/feedbacks/create-feedback',
    auth('student', 'staff'),
    validateRequest(MessValidations.createFeedbackValidationSchema),
    MessControllers.createFeedback,
);
router.get(
    '/feedbacks',
    auth('staff', 'super-admin', 'domain-admin'),
    MessControllers.getAllFeedbacks,
);

router.post(
    '/bills/create-bill',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(MessValidations.createBillValidationSchema),
    MessControllers.createBill,
);
router.get(
    '/bills',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    MessControllers.getAllBills,
);
router.get(
    '/bills/:id',
    auth('staff', 'super-admin', 'domain-admin', 'student'),
    MessControllers.getSingleBill,
);
router.patch(
    '/bills/:id',
    auth('staff', 'super-admin', 'domain-admin'),
    validateRequest(MessValidations.updateBillValidationSchema),
    MessControllers.updateBill,
);

export const MessRoutes = router;
