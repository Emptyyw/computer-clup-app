import { useAuth } from 'hooks/useAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes } from '../../routes';
import { DASHBOARD_ROUTE, HOME_ROUTE } from 'utils/constsRoutes';
import { useEffect, useState } from 'react';

const AppRouter = () => {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(auth && !!auth.login);
  const [isAdmin, setIsAdmin] = useState(isAuthenticated && auth.role === 'admin');

  useEffect(() => {
    setIsAuthenticated(auth && !!auth.login);
    setIsAdmin(isAuthenticated && auth.role === 'admin');
  }, [auth, isAuthenticated]);

  const renderAdminRoutes = () =>
    [...adminRoutes, ...privateRoutes]
      .map(({ path, element }) => <Route key={path} path={path} element={element} />)
      .concat(
        <Route
          key="admin-default"
          path="*"
          element={<Navigate to={DASHBOARD_ROUTE} />}
        />,
      );

  const renderPrivateRoutes = () =>
    privateRoutes
      .map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children &&
            children.map(({ path: childPath, element: childElement }) => (
              <Route key={childPath} path={childPath} element={childElement} />
            ))}
        </Route>
      ))
      .concat(
        <Route
          key="private-default"
          path="*"
          element={<Navigate to={DASHBOARD_ROUTE} />}
        />,
      );

  const renderPublicRoutes = () =>
    publicRoutes
      .map(({ path, element }) => <Route key={path} path={path} element={element} />)
      .concat(
        <Route key="public-default" path="*" element={<Navigate to={HOME_ROUTE} />} />,
      );

  return (
    <Routes>
      {isAdmin ? renderAdminRoutes() : null}
      {isAuthenticated ? renderPrivateRoutes() : null}
      {!isAuthenticated ? renderPublicRoutes() : null}
    </Routes>
  );
};

export default AppRouter;
