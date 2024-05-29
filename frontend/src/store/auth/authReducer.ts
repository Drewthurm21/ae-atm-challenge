import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SafeCustomerData } from '@shared/types';

interface UserStateShape {
  user: SafeCustomerData | null;
}

const initialState: UserStateShape = {
  user: null,
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserAction: (state, action: PayloadAction<SafeCustomerData>) => {
      state.user = action.payload;
    },
    logoutUserAction: (state) => {
      state.user = null;
    },
  }
});

export const { loginUserAction, logoutUserAction } = userAuth.actions;
export default userAuth.reducer;