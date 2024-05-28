import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "@shared/prismaTypes";
import { AccountWithDailyTotals } from "@shared/types";

export interface AccountStateShape {
  accounts: Record<number, AccountWithDailyTotals> | null;
}

const initialState: AccountStateShape = {
  accounts: null,
};

const accountData = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadAccountAction: (state, action: PayloadAction<Account>) => {
      state.accounts = {
        ...state.accounts,
        [action.payload.id]: action.payload,
      };
    },
    clearAccountAction: (state) => {
      state.accounts = null;
    },
  },
});

export const { loadAccountAction, clearAccountAction } = accountData.actions;
export default accountData.reducer;
