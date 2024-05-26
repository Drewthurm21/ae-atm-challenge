import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateShape } from './authTypes';
import { loginUserThunk } from './authThunks';

const initialState: UserStateShape = {
  user: null,
  loadingStatus: 'idle',
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.loadingStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

export const { logoutUser } = userAuth.actions;
export default userAuth.reducer;