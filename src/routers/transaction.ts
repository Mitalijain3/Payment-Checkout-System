import express from 'express';
import { createTranscationHandler, getTransactionDetailsHandler, makePaymentHandler } from '../controllers';
import { createPaymentSchema, createTransactionSchema } from '../schema';
import { validate } from '../middlewares';

const transactionRouter = express.Router();

transactionRouter.post('/', validate(createTransactionSchema), createTranscationHandler);
transactionRouter.get('/:transactionId', getTransactionDetailsHandler);
transactionRouter.post('/createPayment', validate(createPaymentSchema), makePaymentHandler);

export default transactionRouter;
