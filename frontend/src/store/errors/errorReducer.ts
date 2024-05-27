import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorStateShape } from './errorTypes';

const initialState: ErrorStateShape = {
  messages: [],
};


const errorState = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setReduxErrors: (state, action: PayloadAction<any>) => {
      state.messages = [...action.payload];
    },
    clearReduxErrors: (state) => {
      state.messages = null;
    }
  },
});

export const { setReduxErrors, clearReduxErrors } = errorState.actions;
export default errorState.reducer;