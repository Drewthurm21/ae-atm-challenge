import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageStateShape {
  errors: string[] | null;
  messages: string[] | null;
}

const initialState: MessageStateShape = {
  errors: null,
  messages: null,
};

const modalMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setModalErrorsAction: (state, action: PayloadAction<any>) => {
      state.errors = [...action.payload];
    },
    clearModalErrorsAction: (state) => {
      state.errors = null;
    },
    setModalMessagingAction: (state, action: PayloadAction<any>) => {
      state.messages = [...action.payload];
    },
    clearModalMessagingAction: (state) => {
      state.messages = null;
    }
  },
});

export const { setModalMessagingAction, clearModalMessagingAction } = modalMessages.actions;
export default modalMessages.reducer;