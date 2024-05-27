import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorStateShape } from './errorTypes';

const initialState: ErrorStateShape = {
  messages: [],
};

const errorState = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setReduxErrorsAction: (state, action: PayloadAction<any>) => {
      state.messages = [...action.payload];
    },
    clearReduxErrorsAction: (state) => {
      state.messages = null;
    }
  },
});

export const { setReduxErrorsAction, clearReduxErrorsAction } = errorState.actions;
export default errorState.reducer;