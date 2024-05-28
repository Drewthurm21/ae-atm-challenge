import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authData from './auth/authReducer';
import errorData from './errors/errorReducer';
import accountData from './accounts/accountsReducer'

const store = configureStore({
  reducer: {
    userAuth: authData,
    errorData,
    accountData
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
