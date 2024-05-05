import { RootState } from 'store/store';

export const searchUserResultsSelector = (state: RootState) =>
  state.user.searchUserResults;
