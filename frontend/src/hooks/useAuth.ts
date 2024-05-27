import axios from 'axios';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { RootState } from '../store/store';
import { loginUserAction, logoutUserAction} from '../store/auth/authReducer';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();
  const { user, loadingStatus } = useAppSelector((state: RootState) => state.userAuth);

  const loginUser = async (id: number) =>  {
    try {
      let res = await axios.post('http://localhost:3000/users/login', { account_id: id });
      dispatch(loginUserAction(res.data));
    } catch(error) {
      console.log('error in loginUser', error);
      handleApiError(error, dispatch);
      openModalDisplay()
    }
  };

  const logoutUser = () => dispatch(logoutUserAction());
  
  return { user, loadingStatus, loginUser, logoutUser };
};

export default useAuth;
