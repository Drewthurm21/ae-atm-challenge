import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { Transaction } from '@prisma/client';
import { AccountWithOptionalDetails } from '../types';


export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
  const { id }= req.params;

  try {
    const account: AccountWithOptionalDetails | null = await prisma.account.findUnique({
      where: { id: Number(id) },
      include: { transactions: true }
    });

    if (!account) {
      throw new Error('Account not found.');
    };

    const accountData = {
      id: account.id,
      balance: account.balance,
      type: account.type,
      credit_limit: account.credit_limit,
      transaction_ids: account.transactions?.map(transaction => transaction.id)
    };

    res.status(200).json(accountData);
  } catch (error) {
    console.error('Error in getAccountById. Request body:', req.body);
    next(error);
  };
};

export const getAccountTransactions = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  try {
    const transactions: Transaction[] | null = await prisma.transaction.findMany({
      where: { account_id: Number(id) }
    });

    if (!transactions || transactions.length === 0) {
      throw new Error('Transactions not found.');
    };

    const transactionData: Record<number, Transaction> = transactions.reduce((acc: any, transaction) => {
      acc[transaction.id] = transaction;
      return acc
    }, {});

    res.status(200).json(transactionData);

  } catch (error) {
    console.error('Error in getAccountTransactions. Request body:', req);
    next(error);
  };
};

