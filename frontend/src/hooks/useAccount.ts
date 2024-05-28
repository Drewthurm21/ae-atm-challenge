import axios from 'axios';
import { loadAccountAction, clearAccountAction } from '../store/accounts/accountsReducer';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { selectAccountById, selectDailyTotalsByAccountId } from '../store/accounts/accountSelectors';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';

const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();  

  const loadAccounts = async (id: number) =>  {
    try {
      let res = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch(loadAccountAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in loginUser', error);
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  };
  
  const getAccount = (id: number) => useAppSelector(() => selectAccountById(id));
  const getDailyTotals = (id: number) =>  useAppSelector(() => selectDailyTotalsByAccountId(id));
  const clearAccount = () => dispatch(clearAccountAction());
  
  return { getAccount, getDailyTotals, loadAccounts, clearAccount };
};

export default useAccounts;
