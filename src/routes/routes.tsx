import { ReactElement } from 'react';
import { RoutePaths } from 'Enum/Enum';
import { App } from 'App';
import AuthenticationForm from 'components/Auth/AuthForm';
import Dashboard from 'components/dashboard';
import HomePage from 'components/pages/HomePage/HomePage';
import AdminPage from 'components/pages/AdminPage/AdminPage';
import Profile from 'components/pages/ProfilePage/Profile';
import Teams from 'components/pages/ProfilePage/ProfileTabs/Teams';
import Friends from 'components/pages/ProfilePage/ProfileTabs/Friends';
import Statistics from 'components/pages/ProfilePage/ProfileTabs/Statistics';
import { Error404 } from 'components/pages/Error404/Error404';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { AdminRoutes } from 'routes/AdminRoutes';
import { ShopPage } from 'components/pages/ShopPage/ShopPage';

export interface IRoute {
  path: string;
  element: ReactElement;
  children?: IRoute[];
}

export const publicRoutes: IRoute[] = [
  { path: RoutePaths.HOME_ROUTE, element: <HomePage /> },
  { path: RoutePaths.LOGIN_ROUTE, element: <AuthenticationForm type="login" /> },
  {
    path: RoutePaths.REGISTRATION_ROUTE,
    element: <AuthenticationForm type="register" />,
  },
  { path: RoutePaths.ERROR_404, element: <Error404 /> },
];

export const adminRoutes: IRoute[] = [
  { path: RoutePaths.ADMIN_ROUTE, element: <AdminPage /> },
  { path: RoutePaths.ERROR_404, element: <Error404 /> },
];

export const privateRoutes: IRoute[] = [
  { path: RoutePaths.DASHBOARD_ROUTE, element: <Dashboard /> },
  // { path: RoutePaths.LOGIN_ROUTE, element: <Dashboard /> },
  {
    path: RoutePaths.SHOP_ROUTE,
    element: <ShopPage />,
  },
  { path: RoutePaths.ERROR_404, element: <Error404 /> },
  {
    path: RoutePaths.PROFILE_ROUTE,
    element: <Profile />,
    children: [
      {
        path: `${RoutePaths.PROFILE_ROUTE}${RoutePaths.PROFILE_TEAMS_ROUTE}`,
        element: <Teams />,
      },
      {
        path: `${RoutePaths.PROFILE_ROUTE}${RoutePaths.PROFILE_FRIENDS_ROUTE}`,
        element: <Friends />,
      },
      {
        path: `${RoutePaths.PROFILE_ROUTE}${RoutePaths.PROFILE_STATISTICS_ROUTE}`,
        element: <Statistics />,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Navigate to={RoutePaths.ERROR_404} />,
    children: [
      ...publicRoutes,
      {
        element: <AdminRoutes />,
        children: adminRoutes,
      },
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
]);
