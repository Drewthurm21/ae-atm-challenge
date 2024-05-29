import axios from 'axios';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { selectCurrentAccount } from '../store/accounts/accountSelectors';
import { loadAccountAction, clearAccountAction } from '../store/accounts/accountsReducer';
import { setModalErrorsAction as setErrors, setModalMessagingAction as setMessages } from '../store/messaging/modalMessageReducer';
import { ValidatedTransactionState } from '@shared/types';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';
import { TransactionRequestData } from '@shared/types';

const BASE_URL = 'http://localhost:3000'
const DAILY_WITHDRAW_LIMIT = 400;
const SINGLE_WITHDRAW_LIMIT = 200;
const SINGLE_DEPOSIT_LIMIT = 1000;

interface ValidationProps {
  transactionData: TransactionRequestData;
  pathname: string;
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
      openModalDisplay();
      return null;
    }
  };

  const submitTransaction = async ({
     transactionData, pathname 
    }: { transactionData: TransactionRequestData, pathname: string}) => {

    try {
      let res = await axios.post(`${BASE_URL}/transactions${pathname}`, transactionData);
      dispatch(loadAccountAction(res.data));
      dispatch(setMessages(['Transaction successful!']))
      openModalDisplay();
      return res.data;
    } catch(error) {
      console.log('error in useAccounts');
      handleApiError(error, dispatch);
      openModalDisplay();
      return null;
    };
  };

  const validateTransaction = ({transactionData, pathname}: ValidationProps) => {
    const transactionState: ValidatedTransactionState = { errors: [], hasErrors: false };
    const transaction = { transactionData, transactionState, currentAccount };
    const { errors } = transactionState;
  
    if (transactionData.amount <= 0) {
      errors.push('Transactions amount must be greater than $0.');
    }
  
    if (pathname === "/deposit") {
      executeDepositValidation(transaction);
    } else {
      executeWithdrawalValidation(transaction);
    };
    
    if (errors.length > 0) {
      transactionState.hasErrors = true;
      dispatch(setErrors(errors));
      openModalDisplay();
    }

    return transactionState;
  };

  
  const clearAccounts = () => dispatch(clearAccountAction());
  
  return { currentAccount, loadAccount, clearAccounts, submitTransaction, validateTransaction };
};

interface WithdrawDepositProps {
  transactionData: TransactionRequestData;
  transactionState: ValidatedTransactionState;
  currentAccount: any;
};


const executeWithdrawalValidation = ({transactionData, transactionState, currentAccount}: WithdrawDepositProps) => {
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
  };

  return;
};

const executeDepositValidation = ({transactionData, transactionState, currentAccount}: WithdrawDepositProps) => {
  const { errors } = transactionState;
  const { credit } = transactionData;

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
