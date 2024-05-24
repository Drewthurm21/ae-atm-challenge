import { Transaction } from '@prisma/client';
import { AccountWithDailyTotals, ValidatedTransaction } from '../types';
import Decimal from 'decimal.js';

const DAILY_WITHDRAWAL_LIMIT = new Decimal(400);
const SINGAL_WITHDRAWAL_LIMIT = new Decimal(200);
const DAILY_DEPOSIT_LIMIT = new Decimal(1000);

export const validateDepositTransaction = (transaction: Transaction, account: AccountWithDailyTotals): ValidatedTransaction => {
  const transactionStatus: ValidatedTransaction = { isValid: true, errors: [] };

  const { balance, credit_limit, daily_totals } = account;
  const allowedCreditDepositAmount = new Decimal (credit_limit).minus(balance);

  if (daily_totals[0].total_deposit.plus(transaction.credit).greaterThan(DAILY_DEPOSIT_LIMIT)) {
    transactionStatus.errors.push('Deposit exceeds daily deposit limit.');
  };

  if (account.type === 'CREDIT' && transaction.credit.greaterThan(allowedCreditDepositAmount)) {
    transactionStatus.errors.push('Deposit exceeds credit balance.');
  };
  
  if (transactionStatus.errors.length > 0) transactionStatus.isValid = false;

  return transactionStatus;
};