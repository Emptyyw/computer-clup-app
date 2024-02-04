import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { email, token, id, login } = useSelector(state => state.user);

  return {
    isAuthenticated: !!token,
    email,
    token,
    id,
    login,
  };
};
