import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PaymentControllers } from './payment.controller';
import { PaymentValidations } from './payment.validation';

const router = express.Router();

router.post(
    '/create-payment',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    validateRequest(PaymentValidations.createPaymentValidationSchema),
    PaymentControllers.createPayment,
);
router.post(
    '/razorpay-webhook',
    express.raw({ type: 'application/json' }),
    (req, _res, next) => {
        (req as any).rawBody = (req.body as Buffer).toString('utf8');
        try {
            req.body = JSON.parse((req as any).rawBody);
        } catch {
            req.body = {};
        }
        next();
    },
    PaymentControllers.razorpayWebhook,
);
router.get(
    '/',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    PaymentControllers.getAllPayments,
);
router.get(
    '/:id',
    auth('staff', 'domain-admin', 'super-admin', 'student'),
    PaymentControllers.getSinglePayment,
);
router.patch(
    '/:id/refund',
    auth('staff', 'domain-admin', 'super-admin'),
    PaymentControllers.refundPayment,
);

export const PaymentRoutes = router;
