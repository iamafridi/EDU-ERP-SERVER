import httpStatus from 'http-status';
import mongoose from 'mongoose';
import crypto from 'crypto';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import { Fee } from '../fee/fee.model';

const createPaymentIntoDB = async (payload: TPayment) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const fee = await Fee.findById(payload.fee).session(session);
        if (!fee) throw new AppError(httpStatus.NOT_FOUND, 'Fee record not found');

        const result = await Payment.create([payload], { session });

        const newPaid = fee.paidAmount + payload.amount;
        const newStatus = newPaid >= fee.totalAmount ? 'paid' : 'partial';
        const newDue = Math.max(0, fee.totalAmount - newPaid);

        await Fee.findByIdAndUpdate(
            payload.fee,
            { paidAmount: newPaid, dueAmount: newDue, status: newStatus },
            { session },
        );

        await session.commitTransaction();
        session.endSession();
        return result[0];
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

const handleRazorpayWebhookIntoDB = async (payload: Record<string, unknown>, razorpaySignature?: string, webhookBody?: string) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret && razorpaySignature && webhookBody) {
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(webhookBody)
            .digest('hex');
        const isValid = crypto.timingSafeEqual(
            Buffer.from(razorpaySignature),
            Buffer.from(expectedSignature),
        );
        if (!isValid) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid webhook signature');
        }
    }
    return { received: true, message: 'Webhook processed' };
};

const getAllPaymentsFromDB = async (query: Record<string, unknown>) => {
    const paymentQuery = new QueryBuilder(
        Payment.find().populate('fee student'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const data = await paymentQuery.modelQuery;
    const meta = await paymentQuery.countTotal();
    return { data, meta };
};

const getSinglePaymentFromDB = async (id: string) => {
    const result = await Payment.findById(id).populate('fee student');
    if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
    return result;
};

const refundPaymentIntoDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const payment = await Payment.findById(id).session(session);
        if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
        if (payment.status === 'refunded') {
            throw new AppError(httpStatus.BAD_REQUEST, 'Payment already refunded');
        }

        payment.status = 'refunded';
        await payment.save({ session });

        const fee = await Fee.findById(payment.fee).session(session);
        if (fee) {
            const newPaid = fee.paidAmount - payment.amount;
            const newDue = fee.totalAmount - newPaid;
            await Fee.findByIdAndUpdate(
                payment.fee,
                {
                    paidAmount: Math.max(0, newPaid),
                    dueAmount: Math.max(0, newDue),
                    status: newPaid <= 0 ? 'unpaid' : 'partial',
                },
                { session },
            );
        }

        await session.commitTransaction();
        session.endSession();
        return payment;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

export const PaymentServices = {
    createPaymentIntoDB,
    handleRazorpayWebhookIntoDB,
    getAllPaymentsFromDB,
    getSinglePaymentFromDB,
    refundPaymentIntoDB,
};
