import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SafeCustomerData } from '@shared/types';
import axios from 'axios';

interface UserState {
  user: SafeCustomerData | null;
  loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  user: null,
  loadingStatus: 'idle',
};


export const loginUser = createAsyncThunk('users/userLogin', async (id: number) => {
  const response = await axios.post('http://localhost:3000/users/login', { account_id: id });
  return response.data;
});


const userSlice = createSlice({
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
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingStatus = 'succeeded';
        state.user = action.payload;
      })
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;