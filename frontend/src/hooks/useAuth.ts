import { useAppDispatch, useAppSelector } from './reduxHooks';
import { loginUserThunk } from '../store/auth/authThunks';
import { RootState } from '../store/store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loadingStatus } = useAppSelector((state: RootState) => state.userAuth);

  const loginUser = async (id: number) => {
    try {
      await dispatch(loginUserThunk(id));
    } catch (err) {
      console.error(err);
      // FINISH LATER: HANDLE ERROR ONCE ERROR SLICE IS WRITTEN.
    }
  };

  return { user, loadingStatus, loginUser };
};

export default useAuth;
