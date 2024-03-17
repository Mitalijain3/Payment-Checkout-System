import { PaymentMethod, Transaction, User } from '../model';
import { v4 as uuidv4 } from 'uuid';

const createTranscation = async (userId: string, amount: number) => {
  try {
    return await Transaction.create({ transactionId: uuidv4(), userId, amount });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getTransactionById = async (transactionId: string) => {
  try {
    return await Transaction.findOne({
      where: { transactionId },
    });
  } catch (error) {
    console.error('Error retrieving transaction by ID:', error);
    throw error;
  }
};

const updateTransactionById = async (transactionId: string, status: 'Pending' | 'Completed') => {
  try {
    await Transaction.update({ status }, { where: { transactionId } });
  } catch (error) {
    console.error('Error retrieving transaction by ID:', error);
    throw error;
  }
};

const getAllPaymentMethods = async (transactionId: string) => {
  try {
    return await PaymentMethod.findAll({ where: { transactionId } });
  } catch (error) {
    console.error('Error retrieving transaction by ID:', error);
    throw error;
  }
};

const createPayment = async (transactionId: string, amount: number, method: 'Card' | 'Crypto' | 'Bank Transfer') => {
  try {
    return await PaymentMethod.create({ paymentId: uuidv4(), transactionId, method, amount });
  } catch (error) {
    console.error('Error retrieving transaction by ID:', error);
    throw error;
  }
};

export { createTranscation, getTransactionById, getAllPaymentMethods, createPayment, updateTransactionById };
