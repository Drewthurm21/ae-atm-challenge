import { RootState } from "../store";

export const selectAccountById = (state: RootState, id: number) => {
  if (!state.accountData.accounts) return null;
  return state.accountData.accounts[id];
};

export const selectTotalsAccountById = (state: RootState, id: number) => {
  if (!state.accountData.accounts) return null;
  return state.accountData.accounts[id].daily_totals;
};
