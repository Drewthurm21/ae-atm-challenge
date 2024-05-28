import axios from 'axios';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { loginUserAction, logoutUserAction} from '../store/auth/authReducer';
import { selectCurrentUser } from '../store/auth/authSelectors';
import { handleApiError } from '../api/apiUtils';
import { useModal } from '../context/ModalProvider';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { openModalDisplay } = useModal();

  const currentUser = useAppSelector(selectCurrentUser);
  
  const loginUser = async (id: number) =>  {
    try {
      let res = await axios.post('http://localhost:3000/users/login', { account_id: id });
      dispatch(loginUserAction(res.data));
      return res.data;
    } catch(error) {
      console.log('error in loginUser', error);
      handleApiError(error, dispatch);
      openModalDisplay()
      return null;
    }
  };

  const logoutUser = () => dispatch(logoutUserAction());
  
  return { currentUser, loginUser, logoutUser };
};

export default useAuth;
