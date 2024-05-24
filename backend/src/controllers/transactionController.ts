import { Request, Response, NextFunction } from 'express';
import { Transaction, TransactionStatus } from '@prisma/client';
import { CustomError } from '../middleware/errorHandler';
import { AccountWithDailyTotals, AccountWithOptionalDetails, ValidatedTransaction } from '../types';
import { validateDepositTransaction } from '../services/transactionValidations';
import { 
  createDepositTransaction,
  getAccountWithTodayDailyTotalsById,
  getAccountWithTransactionsById,
  updateAccountBalance,
  updateDailyTotals,
  updateTransactionStatus
} from '../services/queries';

export const handleDeposit = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id, account_id, credit } = req.body;

  try {
    const transaction: Transaction | null = await createDepositTransaction(customer_id, account_id, credit);
    const account: AccountWithDailyTotals | null = await getAccountWithTodayDailyTotalsById(account_id);

    if (!transaction || !account) {
      const error: CustomError = new Error('Deposit failed. Account not found.');
      error.status = 400;
      throw error;
    }

    //Validate the transaction
    const validatedTransaction: ValidatedTransaction = validateDepositTransaction(transaction, account);
    if (!validatedTransaction.isValid) {
      const error: CustomError = new Error('Deposit failed. Validation errors.');
      error.status = 400;
      error.errors = validatedTransaction.errors;
      throw error;
    }

    //Handle necessary updates
    const updatedAccount = await updateAccountBalance(transaction);
    if (!updatedAccount) {
      const error: CustomError = new Error('Deposit failed. Account balance update failed.');
      error.status = 500;
      throw error;
    }

    const updatedDailyTotals = await updateDailyTotals(transaction);
    if (!updatedDailyTotals) {
      const error: CustomError = new Error('Deposit failed. Daily totals update failed.');
      error.status = 500;
      throw error;
    }


    //Create and send response
    const completedTransaction = await updateTransactionStatus(transaction.id, TransactionStatus.COMPLETED);
    if (!completedTransaction) {
      const error: CustomError = new Error('Deposit failed. Transaction status update failed.');
      error.status = 500;
      throw error;
    }

    res.status(201).json({ transaction: completedTransaction, account: updatedAccount });
    
  } catch (error) {
    console.error('Error occurred in handleDeposit.');
    next(error);
  }
};
