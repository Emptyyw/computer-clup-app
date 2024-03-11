import { ReactElement } from 'react';
import { RoutePaths } from './src/Enum/Enum';
import AuthenticationForm from './src/components/Auth/AuthForm';
import Dashboard from './src/components/dashboard';
import HomePage from './src/components/pages/HomePage/HomePage';
import AdminPage from './src/components/pages/AdminPage/AdminPage';
import NotFoundPage from './src/components/pages/NotFoundPage/NotFoundPage';
import Profile from './src/components/pages/ProfilePage/Profile';
import Teams from './src/components/pages/ProfilePage/ProfileTabs/Teams';
import Friends from './src/components/pages/ProfilePage/ProfileTabs/Friends';
import Statistics from './src/components/pages/ProfilePage/ProfileTabs/Statistics';

interface Route {
  path: string;
  element: ReactElement;
  children?: Route[];
}

export const publicRoutes: Route[] = [
  {
    path: RoutePaths.LOGIN_ROUTE,
    element: <AuthenticationForm type="login" />,
  },
  {
    path: RoutePaths.REGISTRATION_ROUTE,
    element: <AuthenticationForm type="register" />,
  },
  {
    path: RoutePaths.HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: RoutePaths.NOT_FOUND_ROUTE,
    element: <NotFoundPage />,
  },
];

export const privateRoutes: Route[] = [
  {
    path: RoutePaths.DASHBOARD_ROUTE,
    element: <Dashboard />,
  },
  {
    path: RoutePaths.NOT_FOUND_ROUTE,
    element: <NotFoundPage />,
  },
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

export const adminRoutes: Route[] = [
  {
    path: RoutePaths.ADMIN_ROUTE,
    element: <AdminPage />,
  },
];
