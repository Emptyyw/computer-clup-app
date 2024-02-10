import { Group, Button, Image, Text } from '@mantine/core';
import { ActionToggle } from 'components/shared/ActionToggle/ActionToggle';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import classes from './Header.module.css';
import logo from 'assets/logo/shuriken.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'hooks/useAuth';

export function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAuth();
  const isAuthenticated = !!user.token;

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };
  const handleLogoutClick = () => {
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
          {!isAuthenticated ? (
            <Group justify="center">
              <Button onClick={handleSignupClick}>{t('Sign up')}</Button>
              <Button onClick={handleLoginClick} variant="default">
                {t('Log in')}
              </Button>
            </Group>
          ) : (
            <Group justify="center">
              <Button onClick={handleLogoutClick} variant="default">
                {t('Log out')}
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
