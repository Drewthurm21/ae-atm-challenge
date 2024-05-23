import { Account, Customer, Transaction } from '@prisma/client';

export interface CustomerWithOptionalDetails extends Customer {
  accounts: Account[];
  transactions?: Transaction[];
};

export type safeCustomerData = {
  id: number;
  name: string;

  account_ids: number[];
};

export interface AccountWithOptionalDetails extends Account {
  transactions?: Transaction[];
};
