import { Transaction } from '@prisma/client';
import { AccountWithDailyTotals, ValidatedTransactionState } from '../types';
import Decimal from 'decimal.js';

const DAILY_WITHDRAWAL_LIMIT = new Decimal(400);
const SINGLE_WITHDRAWAL_LIMIT = new Decimal(200);
const SINGLE_DEPOSIT_LIMIT = new Decimal(1000);

export const validateDepositTransaction = (transaction: Transaction, account: AccountWithDailyTotals): ValidatedTransactionState => {
  const transactionStatus: ValidatedTransactionState = { hasErrors: false, errors: [] };

  if (transaction.credit.greaterThan(SINGLE_DEPOSIT_LIMIT)) {
    transactionStatus.errors.push(
      'Deposit exceeds single transaction limit.', 
      `Deposits must be $${SINGLE_DEPOSIT_LIMIT} or less.`
    );
  };

  if (account.type === 'CREDIT' && transaction.credit.greaterThan(account.balance.abs())) {
    transactionStatus.errors.push(
      'Deposit exceeds credit balance.', 
      `Maximum deposit amount is $${account.balance}.`
    );
  };
  
  if (transactionStatus.errors.length > 0) transactionStatus.hasErrors = true;

  return transactionStatus;
};

export const validateWithdrawalTransaction = (transaction: Transaction, account: AccountWithDailyTotals): ValidatedTransactionState => {
  const transactionStatus: ValidatedTransactionState = { hasErrors: false, errors: [] };
  const { debit } = transaction;
  const { daily_totals } = account;

  const allowedWithdrawalAmount = DAILY_WITHDRAWAL_LIMIT.minus(daily_totals[0].total_withdrawals.abs());

  if (debit.modulo(5).greaterThan(0)) {
    transactionStatus.errors.push(
      'Withdrawal amount must be a multiple of $5.'
    );
  }

  if (debit.greaterThan(SINGLE_WITHDRAWAL_LIMIT)) {
    transactionStatus.errors.push(
      'Withdrawal exceeds single transaction limit.', 
      `Withdrawals must be $${SINGLE_WITHDRAWAL_LIMIT} or less.`
    );
  };

  if (debit.greaterThan(allowedWithdrawalAmount)) {
    transactionStatus.errors.push(
      'Withdrawal exceeds daily limit.', 
      `Available withdrawal amount is $${allowedWithdrawalAmount}.`
    );
  };

  // Specific checks for credit vs savings/checking accounts
  if (account.type === 'CREDIT') {
    if (debit.plus(account.balance).greaterThan(account.credit_limit)) {
      transactionStatus.errors.push(
        'Withdrawal exceeds credit limit.', 
        `Account credit limit is $${account.credit_limit}.`
      );
    };

  } else {
    if (debit.greaterThan(account.balance)) {
      transactionStatus.errors.push(
        'Withdrawal exceeds account balance.', 
        `Account balance is $${account.balance}.`
      );
    };
  };

  if (transactionStatus.errors.length > 0) transactionStatus.hasErrors = true;

  return transactionStatus;
};

