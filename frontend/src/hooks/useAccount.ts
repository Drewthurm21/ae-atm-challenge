import axios from 'axios';
import { loadAccountAction, clearAccountAction } from '../store/accounts/accountsReducer';
import { setReduxErrorsAction as setErrors } from '../store/errors/errorReducer';
import { selectCurrentAccount } from '../store/accounts/accountSelectors';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';
import { TransactionRequestData } from '@shared/types';

const BASE_URL = 'http://localhost:3000'
const SINGLE_DEPOSIT_LIMIT = 1000;

interface ValidationProps {
  transactionData: TransactionRequestData;
  currentAccount: any;
  transactionState?: any;
  pathname?: string;
}

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

    if (!transactionState.hasErrors) {
      dispatch(setErrors(transactionState.errors));
      openModalDisplay();
    };

    try {
      let res = await axios.post(`${BASE_URL}/transactions${pathname}`, transactionData);
      dispatch(loadAccountAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in useAccounts');
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  }
  
  const clearAccounts = () => dispatch(clearAccountAction());
  
  return { currentAccount, loadAccount, clearAccounts, submitTransaction };
};

export const validateTransaction = ({transactionData, pathname, currentAccount}: ValidationProps) => {
  const transactionState = { errors: [], hasErrors: true };

  if (pathname === "/deposit")
    executeDepositValidation({transactionData, transactionState, currentAccount});
    // else
  // executeWithdrawalValidation({transactionData, transactionState, currentAccount});
  

  if (transactionState.errors.length > 0) {
    transactionState.hasErrors = false;
  }

  return transactionState;
};

const executeWithdrawalValidation = ({transactionData, transactionState, currentAccount}: TransactionValidationProps) => {
  const { daily_totals: { total_withdrawal } } = currentAccount;


  if (transactionData.debit <= 0) {
    transactionState.errors.push('Withdrawal amount must be greater than $0.');
  } 
  
  if (transactionData.debit > SINGLE_DEPOSIT_LIMIT) {
    transactionState.errors.push(
      'Withdrawal exceeds single transaction limit.', 
      `Withdrawals must be $${SINGLE_DEPOSIT_LIMIT} or less.`
    );
  }

  if (currentAccount.type === 'CREDIT') {

  } else {
    if (transactionData.debit > +currentAccount.balance) {
      transactionState.errors.push(
        'Withdrawal exceeds account balance.', 
        `Maximum withdrawal amount is $${currentAccount.balance}.`
      );
    }
  }

  return;
};

const executeDepositValidation = ({transactionData, transactionState, currentAccount}: ValidationProps) => {
  
  if (transactionData.credit <= 0) {
    transactionState.errors.push('Deposit amount must be greater than $0.');
  }
  
  if (transactionData.credit > SINGLE_DEPOSIT_LIMIT) {
    transactionState.errors.push(
      'Deposit exceeds single transaction limit.', 
      `Deposits must be $${SINGLE_DEPOSIT_LIMIT} or less.`
    );
  };

  if (currentAccount!.type === 'CREDIT' && transactionData.credit > +currentAccount.balance ) {
    transactionState.errors.push(
      'Deposit exceeds credit balance.', 
      `Maximum deposit amount is $${currentAccount.balance}.`
    );
  };
};


export default useAccounts;
