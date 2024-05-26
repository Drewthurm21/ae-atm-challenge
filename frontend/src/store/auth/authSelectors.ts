import { RootState } from '../store';

export const selectUser = (state: RootState) => state.userAuth.user;
export const selectLoadingStatus = (state: RootState) => state.userAuth.loadingStatus;
