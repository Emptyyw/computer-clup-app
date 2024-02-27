import { useEffect } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconHome2, IconGauge, IconFingerprint, IconLogout } from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { DASHBOARD_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from 'utils/constsRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { persistor, useAppDispatch } from 'store/store';
import { logout } from 'redux/slice/userSlice';
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${active ? classes.active : ''}`}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGauge, label: 'Dashboard', route: DASHBOARD_ROUTE },
  { icon: IconFingerprint, label: 'Security', route: ADMIN_ROUTE },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();
  const isAdmin = auth && auth.role === 'admin';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      navigate(LOGIN_ROUTE);
    }
  }, [auth, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      await persistor.purge();
      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error('error exit', error);
    }
  };

  const links = mockdata
    .filter(link => link.label !== 'Security' || isAdmin)
    .map(link => (
      <NavbarLink
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
        <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
}
