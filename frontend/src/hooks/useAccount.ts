import axios from 'axios';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { selectCurrentAccount } from '../store/accounts/accountSelectors';
import { loadAccountAction, clearAccountAction } from '../store/accounts/accountsReducer';
import { setModalMessagingAction as setErrors } from '../store/messaging/modalMessageReducer';

import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';
import { TransactionRequestData } from '@shared/types';

const BASE_URL = 'http://localhost:3000'
const DAILY_WITHDRAW_LIMIT = 400;
const SINGLE_WITHDRAW_LIMIT = 200;
const SINGLE_DEPOSIT_LIMIT = 1000;

interface ValidationProps {
  transactionData: TransactionRequestData;
  currentAccount: any;
  transactionState?: any;
  pathname?: string;
};

const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();
  const currentAccount = useAppSelector(selectCurrentAccount);

  const loadAccount = async (id: number) =>  {
    try {
      let res = await axios.get(`${BASE_URL}/accounts/${id}`);
      dispatch(loadAccountAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in useAccounts');
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  };

  const submitTransaction = async ({
     transactionData, pathname 
    }: { transactionData: TransactionRequestData, pathname: string}) => {

    const transactionState = validateTransaction({
      transactionData,
      pathname, 
      currentAccount
    });

    if (transactionState.hasErrors) {
      dispatch(setErrors(transactionState.errors));
      openModalDisplay();
    };

    try {
      let res = await axios.post(`${BASE_URL}/transactions${pathname}`, transactionData);
      dispatch(loadAccountAction(res.data));
      console.log('res.data in useAccounts', res.data)
      return res.data;
    } catch(error) {
      console.log('error in useAccounts');
      handleApiError(error, dispatch);
      openModalDisplay();
      return null;
    };
  };
  
  const clearAccounts = () => dispatch(clearAccountAction());
  
  return { currentAccount, loadAccount, clearAccounts, submitTransaction };
};

export const validateTransaction = ({transactionData, pathname, currentAccount}: ValidationProps) => {
  const transactionState = { errors: [], hasErrors: false };

  if (pathname === "/deposit") {
    executeDepositValidation({transactionData, transactionState, currentAccount});
  } else {
    executeWithdrawalValidation({transactionData, transactionState, currentAccount});
  };
  
  if (transactionState.errors.length > 0) {
    transactionState.hasErrors = true;
  }

  return transactionState;
};

const executeWithdrawalValidation = ({transactionData, transactionState, currentAccount}: ValidationProps) => {
  const { balance, credit_limit, daily_totals: { total_withdrawals } } = currentAccount;
  const { errors } = transactionState
  const debitAmount = transactionData.debit;
  
  const allowedWithdrawalAmount = DAILY_WITHDRAW_LIMIT - Math.abs(total_withdrawals);

  if (debitAmount % 5 !== 0) {
    errors.push('Withdrawal amount must be a multiple of $5.'); 
  }
  
  if (debitAmount > SINGLE_WITHDRAW_LIMIT) {
    errors.push(
      'Withdrawal exceeds single transaction limit.', 
      `Withdrawals must be $${SINGLE_WITHDRAW_LIMIT} or less.`
    );
  };

  if (debitAmount > allowedWithdrawalAmount) {
    errors.push(
      'Withdrawal exceeds daily limit.', 
      `Available withdrawal amount is $${allowedWithdrawalAmount}.`
    );
  };

  if (currentAccount.type === 'CREDIT') {
    if (debitAmount + balance > Number(credit_limit)) {
      errors.push(
        'Withdrawal exceeds credit limit.', 
      `Account credit limit is $${credit_limit}.`

      );
    };
  } else {

    if (debitAmount > balance) {
      errors.push(
        'Withdrawal exceeds account balance.', 
      `Account balance is $${balance}.`

      );
    };
  
    if (debitAmount - balance < 0) {
      errors.push(
        'Withdrawal exceeds account balance.', 
      `Account balance is $${balance}.`

      );
    };
  };

  return;
};

const executeDepositValidation = ({transactionData, transactionState, currentAccount}: ValidationProps) => {
  const { errors } = transactionState;
  const { credit } = transactionData;

  if (credit <= 0) {
    errors.push('Deposit amount must be greater than $0.');
  }
  
  if (credit > SINGLE_DEPOSIT_LIMIT) {
    errors.push(
      'Deposit exceeds single transaction limit.', 
      `Deposits must be $${SINGLE_DEPOSIT_LIMIT} or less.`
    );
  };

  if (currentAccount!.type === 'CREDIT' && credit > +currentAccount.balance ) {
    errors.push(
      'Deposit exceeds credit balance.', 
      `Maximum deposit amount is $${currentAccount.balance}.`
    );
  };
};

export default useAccounts;
