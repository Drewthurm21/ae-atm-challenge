import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageStateShape {
  messages: string[] | null;
}

const initialState: MessageStateShape = {
  messages: [],
};

const modalMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
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