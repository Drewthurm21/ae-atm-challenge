import { Account, Customer, DailyTotal, Transaction } from './prismaTypes';

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

export interface DailyTotalData {
  total_deposit: number;
  total_withdrawal: number;
}

export interface AccountWithDailyTotals extends Account {
  balance?: string;
  daily_totals: DailyTotal[] | DailyTotalData;
};

export interface ValidatedTransactionState {
  hasErrors: boolean;
  errors: string[];
}

export interface ApiResponseError {
  errors: string[];
  message: string;
}


