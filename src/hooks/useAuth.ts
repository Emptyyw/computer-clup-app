import { useSelector } from 'react-redux';
import { UserState } from 'redux/slice/userSlice';

interface AppState {
  user: UserState;
}

export const useAuth = () => {
  return useSelector((state: AppState) => state.user);
};
