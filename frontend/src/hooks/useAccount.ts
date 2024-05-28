import axios from 'axios';
import { loadAccountAction, clearAccountAction } from '../store/accounts/accountsReducer';
import { useAppDispatch } from './reduxHooks';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';

const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();

  const loadAccount = async (id: number) =>  {
    try {
      let res = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch(loadAccountAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in useAccounts', error);
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  };

  
  const clearAccount = () => dispatch(clearAccountAction());
  
  return { loadAccount, clearAccount };
};

export default useAccounts;
