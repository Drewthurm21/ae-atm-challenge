import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.userAuth.user;
