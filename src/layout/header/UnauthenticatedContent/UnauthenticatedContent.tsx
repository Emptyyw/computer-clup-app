import { FC } from 'react';
import { AppShell, Divider, Group } from '@mantine/core';
import { HeaderLoginForm } from 'layout/header/HeaderLoginForm/HeaderLoginForm';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import { ActionToggleTheme } from 'components/shared/ActionToggle/ActionToggleTheme';
import { useMediaQuery } from '@mantine/hooks';
import i18next from 'i18next';

export const UnauthenticatedContent: FC = () => {
  const isMatches = useMediaQuery(
    i18next.language === 'en' ? '(max-width: 550px)' : '(max-width: 630px)',
  );

  return (
    <Group>
      {isMatches && (
        <AppShell.Navbar p="md">
          <Group>
            <HeaderLoginForm />
            <LanguageSwitcher />
            <ActionToggleTheme />
          </Group>

          <Divider my="md" />
        </AppShell.Navbar>
      )}

      {!isMatches && (
        <Group>
          <HeaderLoginForm />
          <LanguageSwitcher />
          <ActionToggleTheme />
        </Group>
      )}
    </Group>
  );
};
