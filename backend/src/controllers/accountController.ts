import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { Transaction } from '@prisma/client';
import { AccountWithOptionalDetails } from '../types';
import { CustomError } from '../middleware/errorHandler';


export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
  
  const { account_id }= req.params;

  try {
    const account: AccountWithOptionalDetails | null = await prisma.account.findUnique({
      where: { id: Number(account_id) },
      include: { transactions: true }
    });

    if (!account) {
      const error: CustomError = new Error('Account not found.');
      error.status = 404;
      throw error;
    };

    const accountData = {
      id: account.id,
      balance: account.balance,
      type: account.type,
      credit_limit: account.credit_limit,
      transaction_ids: account.transactions!.map(transaction => transaction.id)
    };

    res.status(200).json(accountData);
  } catch (error) {
    console.error('Error occurred in getAccountById.');
    next(error);
  };
};

export const getAccountTransactions = async (req: Request, res: Response, next: NextFunction) => {
  const { account_id } = req.params;
  
  try {
    const account: AccountWithOptionalDetails | null = await prisma.account.findUnique({
      where: { id: Number(account_id) },
      include: { transactions: true }
    });

    if (!account) {
      const error: CustomError = new Error('Account not found.');
      error.status = 404;
      throw error;
    };

    const transactionData: Record<number, Transaction> = account.transactions!.reduce((acc: any, transaction) => {
      acc[transaction.id] = transaction;
      return acc
    }, {});

    res.status(200).json(transactionData);

  } catch (error) {
    console.error('Error occurred in getAccountTransactions.');
    next(error);
  };
};

