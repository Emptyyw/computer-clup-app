import { FC } from 'react';
import '@mantine/core/styles.css';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppLogo } from 'layout/header/AppLogo/AppLogo';
import { AuthenticatedContent } from 'layout/header/AuthenticatedContent/AuthenticatedContent';
import { UnauthenticatedContent } from 'layout/header/UnauthenticatedContent/UnauthenticatedContent';
import i18next from 'i18next';
import { Outlet } from 'react-router-dom';
import { langSwitcher } from 'Enum/Enum';
import { useAuthUser } from 'hooks/useAuthUser';

export const App: FC = () => {
  const { isAuthenticated } = useAuthUser();

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{
        height: 70,
      }}
      navbar={{
        width: 100,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <AppLogo />

          <Group>
            {isAuthenticated ? <AuthenticatedContent /> : <UnauthenticatedContent />}

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom={
                isAuthenticated
                  ? 'md'
                  : i18next.language === langSwitcher.LangEn
                    ? 'xs'
                    : 'sm'
              }
              size="sm"
              aria-label="Toggle headerNavbar"
            />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
