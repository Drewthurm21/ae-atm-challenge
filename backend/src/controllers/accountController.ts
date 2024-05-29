import { Request, Response, NextFunction } from 'express';
import { Transaction } from '@prisma/client';
import { AccountWithDailyTotals } from '../types';
import { CustomError } from '../middleware/errorHandler';
import { getAccountWithTodayDailyTotalsById, getTransactionsByAccountId } from '../services/queries';


export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
  
  const { account_id }= req.params;

  try {
    const account: AccountWithDailyTotals | null = await getAccountWithTodayDailyTotalsById(Number(account_id));

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
      daily_totals: {
        total_deposits: account.daily_totals[0].total_deposits,
        total_withdrawals: account.daily_totals[0].total_withdrawals,
      }
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
    const transactions: Transaction[] | null = await getTransactionsByAccountId(Number(account_id));

    if (!transactions) {
      const error: CustomError = new Error('Transactions not found.');
      error.status = 404;
      throw error;
    };
    
    const normalizedTransactions: Record<number, Transaction> = transactions.reduce((acc: any, transaction) => {
      acc[transaction.id] = transaction;
      return acc
    }, {});

    res.status(200).json(normalizedTransactions);

  } catch (error) {
    console.error('Error occurred in getAccountTransactions.');
    next(error);
  };
};

