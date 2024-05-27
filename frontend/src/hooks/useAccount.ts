import axios from 'axios';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { loginUserAction, logoutUserAction} from '../store/auth/authReducer';
import { RootState } from '../store/store';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';

const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();
  const { account } = useAppSelector((state: RootState) => state.accountData);

  const loadAccount = async (id: number) =>  {
    try {
      let res = await axios.post(`http://localhost:3000/accounts/${id}`, { account_id: id });
      dispatch(loginUserAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in loginUser', error);
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  };

  

  const clearAccount = () => dispatch(logoutUserAction());
  
  return { account, dailyTotal, loadAccount, clearAccount };
};

export default useAccounts;
