import { Transaction } from '@prisma/client';
import { AccountWithDailyTotals, ValidatedTransaction } from '../types';
import Decimal from 'decimal.js';

const DAILY_WITHDRAWAL_LIMIT = new Decimal(400);
const SINGAL_WITHDRAWAL_LIMIT = new Decimal(200);
const SINGLE_DEPOSIT_LIMIT = new Decimal(1000);

export const validateDepositTransaction = (transaction: Transaction, account: AccountWithDailyTotals): ValidatedTransaction => {
  const transactionStatus: ValidatedTransaction = { isValid: true, errors: [] };

  const { balance, credit_limit } = account;
  const allowedCreditDepositAmount = new Decimal (credit_limit).minus(balance);

  if (transaction.credit.greaterThan(SINGLE_DEPOSIT_LIMIT)) {
    transactionStatus.errors.push('Deposit exceeds single transaction limit.', `Deposits must be $${SINGLE_DEPOSIT_LIMIT} or less.`);
  };

  if (account.type === 'CREDIT' && transaction.credit.greaterThan(allowedCreditDepositAmount)) {
    transactionStatus.errors.push('Deposit exceeds credit balance.', `Maximum deposit amount is $${allowedCreditDepositAmount}.`);
  };
  
  if (transactionStatus.errors.length > 0) transactionStatus.isValid = false;

  return transactionStatus;
};