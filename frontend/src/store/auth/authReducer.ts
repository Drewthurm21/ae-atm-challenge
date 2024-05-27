import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateShape } from './authTypes';
import { SafeCustomerData } from '@shared/types';

const initialState: UserStateShape = {
  user: null,
  loadingStatus: 'idle',
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<SafeCustomerData>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loadingStatus = 'idle';
    },
  }
});

export const { loginUser, logoutUser } = userAuth.actions;
export default userAuth.reducer;