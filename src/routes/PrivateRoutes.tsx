import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutePaths } from 'Enum/Enum';
import { useAuthUser } from 'hooks/useAuthUser';

export const PrivateRoutes: FC = () => {
  const { isAuthenticated } = useAuthUser();

  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePaths.LOGIN_ROUTE} />;
};
