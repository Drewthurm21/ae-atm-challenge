import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserByAccountId } from '../../api/auth';
import { ApiResponseError, SafeCustomerData } from '@shared/types';

export const loginUserThunk = createAsyncThunk<SafeCustomerData, number, { rejectValue: ApiResponseError }>(
  'auth/loginUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await loginUserByAccountId(id);
      if ('errors' in response) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
