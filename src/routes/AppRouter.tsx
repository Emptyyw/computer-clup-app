import { useAuth } from 'hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes } from '../../routes';
import { Props } from 'components/Auth/AuthForm';

const AppRouter = () => {
  const auth = useAuth();
  const isAuthenticated = auth.user && !!auth.user.login;
  const isAdmin = isAuthenticated && auth.user.role === 'admin';

  return (
    <Routes>
      {isAdmin
        ? [...adminRoutes, ...privateRoutes].map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))
        : isAuthenticated
          ? privateRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))
          : publicRoutes.map(({ path, component: Component, props }) => (
              <Route
                key={path}
                path={path}
                element={<Component {...(props as Props)} />}
              />
            ))}
    </Routes>
  );
};

export default AppRouter;
