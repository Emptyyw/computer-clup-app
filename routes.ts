import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  ADMIN_ROUTE,
} from './src/utils/constsRoutes';
import AuthenticationForm from './src/components/Auth/AuthForm';
import Dashboard from './src/components/dashboard';
import HomePage from './src/components/pages/HomePage/HomePage';
import AdminPage from './src/components/pages/AdminPage/AdminPage';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: AuthenticationForm,
    props: { type: 'login' },
  },
  {
    path: REGISTRATION_ROUTE,
    component: AuthenticationForm,
    props: { type: 'register' },
  },
  {
    path: HOME_ROUTE,
    component: HomePage,
  },
];

export const privateRoutes = [
  {
    path: DASHBOARD_ROUTE,
    component: Dashboard,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    component: AdminPage,
  },
];
