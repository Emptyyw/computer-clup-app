import { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconHome2, IconGauge, IconFingerprint, IconLogout } from '@tabler/icons-react';
import classes from './Navbar.module.css';

import { DASHBOARD_ROUTE, ADMIN_ROUTE } from 'utils/constsRoutes';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

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
        className={classes.link}
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
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const auth = useAuth();
  const isAdmin = auth.user && auth.user.role === 'admin';

  const links = mockdata
    .filter(link => link.label !== 'Security' || isAdmin)
    .map((link, index) => (
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => {
          setActive(index);
          navigate(link.route);
        }}
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
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
