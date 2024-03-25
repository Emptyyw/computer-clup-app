import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import classes from './NavBar.module.css';
import { RoutePaths } from 'Enum/Enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { persistor, useAppDispatch } from 'store/store';
import { logout } from 'redux/slice/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';
import { mockdata } from 'config/navbarConfig';
import { NavActive } from 'src/layout/navbar/NavBarLinksActive/NavActive';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAppSelector(getUser);
  const isAdmin = auth && auth.role === 'admin';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      navigate(RoutePaths.LOGIN_ROUTE);
    }
  }, [auth, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      await persistor.purge();
      navigate(RoutePaths.LOGIN_ROUTE);
    } catch (error) {
      console.error('error exit', error);
    }
  };

  const links = mockdata
    .filter(link => link.label !== 'Security' || isAdmin)
    .map(link => (
      <NavActive
        {...link}
        key={link.label}
        active={location.pathname === link.route}
        onClick={() => navigate(link.route)}
      />
    ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavActive icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
};
