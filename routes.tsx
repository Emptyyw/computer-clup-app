import { ReactElement } from 'react';
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  ADMIN_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  PROFILE_FRIENDS_ROUTE,
  PROFILE_TEAMS_ROUTE,
  PROFILE_STATISTICS_ROUTE,
} from './src/utils/constsRoutes';
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
    path: LOGIN_ROUTE,
    element: <AuthenticationForm type="login" />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <AuthenticationForm type="register" />,
  },
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: NOT_FOUND_ROUTE,
    element: <NotFoundPage />,
  },
];

export const privateRoutes: Route[] = [
  {
    path: DASHBOARD_ROUTE,
    element: <Dashboard />,
  },
  {
    path: NOT_FOUND_ROUTE,
    element: <NotFoundPage />,
  },
  {
    path: PROFILE_ROUTE,
    element: <Profile />,
    children: [
      {
        path: PROFILE_TEAMS_ROUTE,
        element: <Teams />,
      },
      {
        path: PROFILE_FRIENDS_ROUTE,
        element: <Friends />,
      },
      {
        path: PROFILE_STATISTICS_ROUTE,
        element: <Statistics />,
      },
    ],
  },
];

export const adminRoutes: Route[] = [
  {
    path: ADMIN_ROUTE,
    element: <AdminPage />,
  },
];
