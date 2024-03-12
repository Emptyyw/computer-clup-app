import { Stack, Tooltip, UnstyledButton, rem } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import classes from '../NavBar.module.css';
import { mockdata } from 'config/navbarConfig';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';

type Props = {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
};

export const NavbarLink = ({ icon: Icon, label, active, onClick }: Props) => {
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
};

interface NavbarLinksProps {
  navigate: (path: string) => void;
  location: { pathname: string };
}

export const NavbarLinks = ({ navigate, location }: NavbarLinksProps) => {
  const auth = useAppSelector(getUser);

  const isAdmin = auth && auth.role === 'admin';

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
    <Stack justify="center" gap={0}>
      {links}
    </Stack>
  );
};
