import { Account, Customer, DailyTotal, Transaction } from '@prisma/client';

export interface CustomerWithOptionalDetails extends Customer {
  accounts: Account[];
  transactions?: Transaction[];
};

export interface SafeCustomerData {
  id: number;
  name: string;

  account_ids: number[];
};

export interface AccountWithOptionalDetails extends Account {
  transactions?: Transaction[];
};

export interface AccountWithDailyTotals extends Account {
  daily_totals: DailyTotal[];
};

export interface ValidatedTransactionState {
  hasErrors: boolean;
  errors: string[];
};

