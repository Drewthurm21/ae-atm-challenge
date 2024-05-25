import { Request, Response, NextFunction } from 'express';
import { Transaction, TransactionStatus } from '@prisma/client';
import { CustomError } from '../middleware/errorHandler';
import { AccountWithDailyTotals, ValidatedTransactionState } from '../types';
import { validateDepositTransaction, validateWithdrawalTransaction } from '../services/transactionValidations';
import { handleUpdatesForTransaction } from '../services/transactionUtils';
import { 
  createPendingTransaction,
  getAccountWithTodayDailyTotalsById,
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
      error.status = 404;
      throw error;
    }

    //Validate the transaction
    const ValidatedTransaction: ValidatedTransactionState = validateDepositTransaction(pendingTransaction, account);
    if (ValidatedTransaction.hasErrors) {
      const error: CustomError = new Error('Deposit failed. Validation errors.');
      error.status = 400;
      error.errors = ValidatedTransaction.errors;
      throw error;
    }

    //Handle necessary updates
    const [updatedAccount, completedTransaction] = await handleUpdatesForTransaction(pendingTransaction, account);

    res.status(201).json({ transaction: completedTransaction, account: updatedAccount });
    
  } catch (error) {
    console.error('Error occurred in handleDeposit.');

    if (pendingTransaction) {
      updateTransactionStatus(pendingTransaction, TransactionStatus.FAILED);
    }
    
    next(error);
  } 
};


export const handleWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id, account_id, credit, debit } = req.body;
  let pendingTransaction: Transaction | null = null;

  if (credit % 5 !== 0) {
    const error: CustomError = new Error('Withdrawal failed. Amount must be a multiple of 5.');
    error.status = 400;
    throw error;
  }

  try {
    pendingTransaction = await createPendingTransaction(customer_id, account_id, credit, debit);
    const account: AccountWithDailyTotals | null = await getAccountWithTodayDailyTotalsById(account_id);

    if (!pendingTransaction || !account) {
      const error: CustomError = new Error('Withdrawal failed. Account not found.');
      error.status = 400;
      throw error;
    }

    //validate the transaction
    const validatedTransaction: ValidatedTransactionState = validateWithdrawalTransaction(pendingTransaction, account);
    if (validatedTransaction.hasErrors) {
      const error: CustomError = new Error('Withdrawal failed. Validation errors.');
      error.status = 400;
      error.errors = validatedTransaction.errors;
      throw error;
    }
    
    //Handle necessary updates
    const [updatedAccount, completedTransaction] = await handleUpdatesForTransaction(pendingTransaction, account);

    res.status(201).json({ transaction: completedTransaction, account: updatedAccount });

  } catch (error) {
    console.error('Error occurred in handleWithdrawal.');
    if (pendingTransaction) {
      updateTransactionStatus(pendingTransaction, TransactionStatus.FAILED);
    }
    next(error);
  }
};

