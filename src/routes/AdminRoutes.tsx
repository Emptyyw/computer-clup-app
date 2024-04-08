import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutePaths } from 'Enum/Enum';
import { useAuthUser } from 'hooks/useAuthUser';

export const AdminRoutes: FC = () => {
  const { isAdmin } = useAuthUser();

  return isAdmin ? <Outlet /> : <Navigate to={RoutePaths.LOGIN_ROUTE} />;
};
