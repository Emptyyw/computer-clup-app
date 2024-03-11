import { Group, Button, Image, Text, Avatar, ActionIcon } from '@mantine/core';
import { ActionToggle } from 'components/shared/ActionToggle/ActionToggle';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import classes from './Header.module.css';
import logo from 'assets/logo/shuriken.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'hooks/useAuth';
import { RoutePaths } from 'Enum/Enum';
import { InputSearch } from 'components/shared/search/InputSearch';
import { IconShoppingCartFilled } from '@tabler/icons-react';
import { IconBellFilled } from '@tabler/icons-react';
import { IconCoins } from '@tabler/icons-react';

export function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const isAuthenticated = auth && !!auth.login;

  const handleLoginClick = () => {
    navigate(RoutePaths.LOGIN_ROUTE);
  };

  const handleSignupClick = () => {
    navigate(RoutePaths.REGISTRATION_ROUTE);
  };

  const handleHomeClick = () => {
    navigate('/');
  };
  const handleProfileClick = () => {
    navigate(RoutePaths.PROFILE_ROUTE);
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
              <LanguageSwitcher />
              <ActionToggle />
            </Group>
          )}
          {isAuthenticated && (
            <Group justify="center">
              <InputSearch />
              <LanguageSwitcher />
              <ActionToggle />
              <ActionIcon radius="lg" variant="subtle" size="xl">
                <IconShoppingCartFilled />
              </ActionIcon>
              <ActionIcon radius="lg" variant="subtle" size="xl">
                <IconBellFilled />
              </ActionIcon>
              <ActionIcon
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
                radius="lg"
                onClick={handleProfileClick}
              >
                <Avatar radius="lg" src={auth.avatarUrl} size="lg" />
              </ActionIcon>
              <ActionIcon radius="lg" variant="subtle" size="xl">
                <IconCoins />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </Group>
    </header>
  );
}
