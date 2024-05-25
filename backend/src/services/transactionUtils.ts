import { prisma } from '../app';
import { Transaction, TransactionStatus } from '@prisma/client';
import { CustomError } from '../middleware/errorHandler';
import { AccountWithDailyTotals, AccountWithOptionalDetails } from '../types';
import { updateDailyTotals, updateAccountBalance, updateTransactionStatus } from '../services/queries';

export const handleUpdatesForTransaction = async (pendingTransaction: Transaction, account: AccountWithDailyTotals): Promise<[AccountWithOptionalDetails, Transaction]> => {
  return await prisma.$transaction(async (prisma) => {
    const updatedDailyTotals = await updateDailyTotals(pendingTransaction!);
    if (!updatedDailyTotals) {
      const error: CustomError = new Error('Deposit failed. Daily totals update failed.');
      error.status = 500;
      throw error;
    }
    
    const updatedAccount = await updateAccountBalance(pendingTransaction!);
    if (!updatedAccount) {
      const error: CustomError = new Error('Deposit failed. Account balance update failed.');
      error.status = 500;
      throw error;
    }
    
    const completedTransaction = await updateTransactionStatus(pendingTransaction!.id, TransactionStatus.COMPLETED);
    if (!completedTransaction) {
      const error: CustomError = new Error('Deposit failed. Transaction status update failed.');
      error.status = 500;
      throw error;
    }

    return [updatedAccount, completedTransaction];
  });
}