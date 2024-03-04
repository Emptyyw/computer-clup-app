import { FC } from 'react';
import '@mantine/core/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/firebase';
import AppRouter from 'routes/AppRouter';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppLogo } from 'layout/header/AppLogo/AppLogo';
import { AuthenticatedContent } from 'layout/header/AuthenticatedContent/AuthenticatedContent';
import { UnauthenticatedContent } from 'layout/header/UnauthenticatedContent/UnauthenticatedContent';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';

export const App: FC = () => {
  const user = useAppSelector(getUser);

  const [opened, { toggle }] = useDisclosure();

  const isAuthenticated = user && !!user.login;

  return (
    <Router>
      <AppShell
        header={{
          height: 70,
        }}
        navbar={{
          width: 100,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <AppLogo />

            {isAuthenticated ? (
              <Group>
                <AuthenticatedContent />
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  aria-label="Toggle headerNavbar"
                />
              </Group>
            ) : (
              <UnauthenticatedContent />
            )}
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <AppRouter />
        </AppShell.Main>
      </AppShell>
    </Router>
  );
};
