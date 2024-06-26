import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authData from './auth/authReducer';
import modalMessages from './messaging/modalMessageReducer';
import accountData from './accounts/accountsReducer'

const store = configureStore({
  reducer: {
    userAuth: authData,
    modalData: modalMessages,
    accountData
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
