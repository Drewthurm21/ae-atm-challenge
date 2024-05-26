import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorStateShape } from './errorTypes';

const initialState: ErrorStateShape = {
  errors: [],
};


const errorState = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setReduxErrors: (state, action: PayloadAction<any>) => {
      state.errors = action.payload;
    },
    clearReduxErrors: (state) => {
      state.errors = null;
    }
  },
});

export const { setReduxErrors, clearReduxErrors } = errorState.actions;
export default errorState.reducer;