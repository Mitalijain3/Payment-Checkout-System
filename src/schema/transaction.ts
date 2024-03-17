import { object, string, number } from 'yup';

const createTransactionSchema = object({
  body: object({
    amount: number().required('Amount is required').positive('Amount must be a positive number'),
    email: string().email('Invalid email format').required('Email is required'),
  }).required('Body is required'),
  headers: object({
    'content-type': string().required('Content Type is required').equals(['application/json'], 'Content Type must be application/json'),
  }).required('Headers are required'),
});

const createPaymentSchema = object({
  body: object({
    transactionId: string().required('Transaction ID is required'),
    amount: number().required('Amount is required').positive('Amount must be a positive number'),
    method: string().required('Payment method is required').oneOf(['Card', 'Crypto', 'Bank Transfer'], 'Invalid payment method'),
  }).required('Body is required'),
});

export { createTransactionSchema, createPaymentSchema };
