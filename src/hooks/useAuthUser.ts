import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';
import { Role } from 'Enum/Enum';

export const useAuthUser = () => {
  const user = useAppSelector(getUser);

  const isAuthenticated = user && !!user.login;
  const isAdmin = isAuthenticated && user.role === Role.ADMIN_ROLE;

  return { isAuthenticated, isAdmin };
};
