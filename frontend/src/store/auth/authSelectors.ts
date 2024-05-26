import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.userAuth.user;
export const selectLoadingStatus = (state: RootState) => state.userAuth.loadingStatus;
