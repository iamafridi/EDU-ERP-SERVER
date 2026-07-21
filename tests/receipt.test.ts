import { z } from 'zod';
import { ReceiptValidations } from '../src/app/modules/receipt/receipt.validation';

describe('Receipt Validation', () => {
    it('should pass with valid receipt data', () => {
        const result = ReceiptValidations.createReceiptValidationSchema.parse({
            body: {
                payment: '507f1f77bcf86cd799439011',
                fee: '507f1f77bcf86cd799439012',
                student: '507f1f77bcf86cd799439013',
                amount: 5000,
            },
        });
        expect(result.body.amount).toBe(5000);
    });

    it('should fail with zero amount', () => {
        expect(() =>
            ReceiptValidations.createReceiptValidationSchema.parse({
                body: {
                    payment: '507f1f77bcf86cd799439011',
                    fee: '507f1f77bcf86cd799439012',
                    student: '507f1f77bcf86cd799439013',
                    amount: 0,
                },
            }),
        ).toThrow();
    });
});
