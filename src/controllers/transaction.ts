import { Request, Response } from 'express';
import {
  createPayment,
  createTranscation,
  getAllPaymentMethods,
  getTransactionById,
  getUserByEmail,
  getUserById,
  updateTransactionById,
} from '../services';

const createTranscationHandler = async (req: Request, res: Response) => {
  const { email, amount } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid User email' });
  }
  // create transcation with status pedning
  const transaction = await createTranscation(user.userId, amount);
  // return 201
  return res.status(201).json({ message: 'Transcation created successfully', transaction });
};

const getTransactionDetailsHandler = async (req: Request, res: Response) => {
  const { transactionId } = req.params;

  // Retrieve transaction details by ID
  try {
    const transaction = await getTransactionById(String(transactionId));
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const user = await getUserById(transaction.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ transaction: { ...transaction.toJSON(), email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error retrieving transaction details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const makePaymentHandler = async (req: Request, res: Response) => {
  try {
    // check staus of transcation
    const transaction = await getTransactionById(req.body.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.status === 'Completed') {
      return res.status(404).json({ error: 'Transaction Payment is already done' });
    }

    const paymentMethods = await getAllPaymentMethods(transaction.transactionId);
    const coveredAmount = paymentMethods.reduce((totalAmountPaid, paymentMethod) => {
      return totalAmountPaid + parseFloat(paymentMethod.amount.toString());
    }, 0);

    console.log(coveredAmount);
    if (transaction.amount - coveredAmount === 0) {
      return res.status(404).json({ error: 'Transaction Payment is already done' });
    }
    if (req.body.amount > transaction.amount - coveredAmount) {
      return res.status(404).json({ error: 'Payment method amount is greater than transcation amnount' });
    }
    await createPayment(transaction.transactionId, req.body.amount, req.body.method);
    if (req.body.amount === transaction.amount - coveredAmount) {
      await updateTransactionById(transaction.transactionId, 'Completed');
      return res.status(200).json({ message: 'Transaction is completed' });
    }
    return res.status(200).json({ message: 'payment created successfully' });
  } catch (error) {
    console.error('Error retrieving transaction details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export { createTranscationHandler, getTransactionDetailsHandler, makePaymentHandler };
