import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scopeQuery, assertOwnership } from '../../utils/scopeQuery';
import { PaymentServices } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
    const body = req.user?.role === 'student' ? { ...req.body, student: req.user.profileId } : req.body;
    const result = await PaymentServices.createPaymentIntoDB(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Payment recorded successfully',
        data: result,
    });
});

const razorpayWebhook = catchAsync(async (req, res) => {
    const signature = req.headers['x-razorpay-signature'] as string;
    const rawBody = (req as any).rawBody;
    const result = await PaymentServices.handleRazorpayWebhookIntoDB(req.body, signature, rawBody);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Webhook processed',
        data: result,
    });
});

const getAllPayments = catchAsync(async (req, res) => {
    const query = scopeQuery(req, { ...req.query }, 'payment');
    const { data, meta } = await PaymentServices.getAllPaymentsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payments retrieved successfully',
        meta,
        data,
    });
});

const getSinglePayment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PaymentServices.getSinglePaymentFromDB(id);
    assertOwnership(req, result, 'payment');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment retrieved successfully',
        data: result,
    });
});

const refundPayment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await PaymentServices.getSinglePaymentFromDB(id);
    assertOwnership(req, record, 'payment');
    const result = await PaymentServices.refundPaymentIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment refunded successfully',
        data: result,
    });
});

export const PaymentControllers = {
    createPayment,
    razorpayWebhook,
    getAllPayments,
    getSinglePayment,
    refundPayment,
};
