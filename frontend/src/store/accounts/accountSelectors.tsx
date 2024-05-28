import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAccountById = (state: RootState, id: number) => {
  if (!state.accountData.accounts) return null;
  return state.accountData.accounts[id];
};

export const selectTotalsAccountById = (state: RootState, id: number) => {
  if (!state.accountData.accounts) return null;
  return state.accountData.accounts[id].daily_totals;
};

const selectUserId = (state: RootState) => state.userAuth.user?.id;
const selectAccounts = (state: RootState) => state.accountData.accounts;

export const selectCurrentAccount = createSelector(
  [selectUserId, selectAccounts],
  (userId, accounts) => {
    if (userId && accounts) {
      return accounts[userId];
    }
    return undefined;
  }
);
