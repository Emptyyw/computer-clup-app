import { Group, Button, Image, Text } from '@mantine/core';
import { ActionToggle } from 'components/shared/ActionToggle/ActionToggle';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import classes from './Header.module.css';
import logo from 'assets/logo/shuriken.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'redux/slice/userSlice';
import { useAuth } from 'hooks/use-auth';

export function HeaderMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, email } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };
  const handleLogoutClick = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        <Group justify="center" grow>
          <Image src={logo} h={30} alt="logo" />
          <Text fw={700}>ClubApp </Text>
        </Group>

        <Group justify="center">
          {isAuthenticated ? (
            <>
              <Button onClick={handleLogoutClick}>Log out from</Button>
              <h3>{email}</h3>
            </>
          ) : (
            <Group justify="center">
              <Button onClick={handleSignupClick}>Sign up</Button>
              <Button onClick={handleLoginClick} variant="default">
                Log in
              </Button>
            </Group>
          )}
          <LanguageSwitcher />
          <ActionToggle />
        </Group>
      </Group>
    </header>
  );
}
