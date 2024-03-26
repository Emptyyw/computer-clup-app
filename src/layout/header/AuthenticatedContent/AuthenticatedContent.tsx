import { FC } from 'react';
import { AppShell, Divider, Group, Paper } from '@mantine/core';
import { Navbar } from 'layout/navbar/NavBar';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import { ActionToggleTheme } from 'components/shared/ActionToggle/ActionToggleTheme';
import { HeaderShoppingCart } from 'layout/header/HeaderShoppingCart/HeaderShoppingCart';
import { HeaderNotify } from 'layout/header/HeaderNotify/HeaderNotify';
import { HeaderUserProfile } from 'layout/header/HeaderUserProfile/HeaderUserProfile';
import { useMediaQuery } from '@mantine/hooks';
import { HeaderInputSearch } from 'src/layout/header/HeaderInputSearch/HeaderInputSearch';

export const AuthenticatedContent: FC = () => {
  const isMatches = useMediaQuery('(max-width: 900px)');

  return (
    <Group>
      <HeaderInputSearch />

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      {isMatches && (
        <AppShell.Navbar p="md">
          <Group>
            <LanguageSwitcher />
            <ActionToggleTheme />
            <HeaderShoppingCart />
            <HeaderNotify />
            <HeaderUserProfile />
          </Group>

          <Divider my="md" />

          <Paper className="navbar">
            <Navbar />
          </Paper>
        </AppShell.Navbar>
      )}

      {!isMatches && (
        <Group>
          <LanguageSwitcher />
          <ActionToggleTheme />
          <HeaderShoppingCart />
          <HeaderNotify />
          <HeaderUserProfile />
        </Group>
      )}
    </Group>
  );
};
