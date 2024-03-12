import { Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import classes from './NavBar.module.css';
import { RoutePaths } from 'Enum/Enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { persistor, useAppDispatch } from 'store/store';
import { logout } from 'redux/slice/userSlice';
import { NavbarLink, NavbarLinks } from './NavBarLinks/NavLinks';
import { FC, useEffect } from 'react';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (!user) {
      navigate(RoutePaths.LOGIN_ROUTE);
    }
  }, [navigate, user]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      await persistor.purge();
      navigate(RoutePaths.LOGIN_ROUTE);
    } catch (error) {
      console.error('error exit', error);
    }
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <NavbarLinks navigate={navigate} location={location} />
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
};
