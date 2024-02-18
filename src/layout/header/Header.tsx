import { Group, Button, Image, Text } from '@mantine/core';
import { ActionToggle } from 'components/shared/ActionToggle/ActionToggle';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import classes from './Header.module.css';
import logo from 'assets/logo/shuriken.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'hooks/useAuth';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'utils/constsRoutes';

export function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const isAuthenticated = auth && !!auth.login;

  const handleLoginClick = () => {
    navigate(LOGIN_ROUTE);
  };

  const handleSignupClick = () => {
    navigate(REGISTRATION_ROUTE);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        <Group onClick={handleHomeClick} justify="center" grow>
          <Image src={logo} h={30} alt="logo" />
          <Text fw={700}>ClubApp</Text>
        </Group>

        <Group justify="center">
          {!isAuthenticated && (
            <Group justify="center">
              <Button onClick={handleSignupClick}>{t('header.sign up')}</Button>
              <Button onClick={handleLoginClick} variant="default">
                {t('header.log in')}
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
