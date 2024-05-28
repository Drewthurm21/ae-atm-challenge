import { AccountWithDailyTotals } from "@shared/types";
import { createSelector } from "reselect";

// Define the shape of your RootState
interface RootState {
  accounts: AccountsState;
}

interface AccountsState {
  accounts: Record<number, AccountWithDailyTotals> | null;
}

const selectAccountsState = (state: RootState) => state.accounts;

export const selectAllAccounts = createSelector(
  [selectAccountsState],
  (accountsState) => accountsState.accounts
);

export const selectAccountById = (accountId: number) =>
  createSelector([selectAllAccounts], (accounts) =>
    accounts ? accounts[accountId] : undefined
  );

export const selectDailyTotalsByAccountId = (accountId: number) =>
  createSelector([selectAccountById(accountId)], (account) =>
    account ? account.daily_totals : undefined
  );
