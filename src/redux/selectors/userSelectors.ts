import { RootState } from 'store/store';

export const getUser = (state: RootState) => state.user;
export const getListUser = (state: RootState) => state.searchUserResults;
