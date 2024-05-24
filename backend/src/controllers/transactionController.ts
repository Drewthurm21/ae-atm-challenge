import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { Transaction, TransactionStatus } from '@prisma/client';
import { CustomError } from '../middleware/errorHandler';
import { AccountWithDailyTotals, ValidatedTransaction } from '../types';
import { validateDepositTransaction } from '../services/transactionValidations';
import { 
  createPendingTransaction,
  getAccountWithTodayDailyTotalsById,
  applyDepositToAccount,
  updateDailyTotals,
  updateTransactionStatus
} from '../services/queries';


export const handleDeposit = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id, account_id, credit, debit } = req.body;
  let pendingTransaction: Transaction | null = null;

  try {
    pendingTransaction = await createPendingTransaction(customer_id, account_id, credit, debit);
    const account: AccountWithDailyTotals | null = await getAccountWithTodayDailyTotalsById(account_id);

    if (!pendingTransaction || !account) {
      const error: CustomError = new Error('Deposit failed. Account not found.');
      error.status = 400;
      throw error;
    }

    //Validate the transaction
    const validatedTransaction: ValidatedTransaction = validateDepositTransaction(pendingTransaction, account);
    if (!validatedTransaction.isValid) {
      const error: CustomError = new Error('Deposit failed. Validation errors.');
      error.status = 400;
      error.errors = validatedTransaction.errors;
      throw error;
    }

    //Handle necessary updates
    const updatedAccount = await prisma.$transaction(async (prisma) => {
        const updatedDailyTotals = await updateDailyTotals(pendingTransaction!);
        if (!updatedDailyTotals) {
          const error: CustomError = new Error('Deposit failed. Daily totals update failed.');
          error.status = 500;
          throw error;
        }

        const updatedAccount = await applyDepositToAccount(pendingTransaction!);
        if (!updatedAccount) {
          const error: CustomError = new Error('Deposit failed. Account balance update failed.');
          error.status = 500;
          throw error;
        }

        return updatedAccount;
    });

    const completedTransaction = await updateTransactionStatus(pendingTransaction!.id, TransactionStatus.COMPLETED);
    if (!completedTransaction) {
      const error: CustomError = new Error('Deposit failed. Transaction status update failed.');
      error.status = 500;
      throw error;
    }

    res.status(201).json({ transaction: completedTransaction, account: updatedAccount });
    
  } catch (error) {
    console.error('Error occurred in handleDeposit.');

    if (pendingTransaction) {
      updateTransactionStatus(pendingTransaction.id, TransactionStatus.FAILED);
    }
    
    next(error);
  } 
};


export const handleWithdrawal = async (req: Request, res: Response, next: NextFunction) => {

  try {
    //create a new transaction

    //get account with daily totals

    //validate the transaction

    //update daily totals

    //update account balance

    //update transaction status

    //send response

  } catch (error) {
    console.error('Error occurred in handleWithdrawal.');
    next(error);
  }
};
