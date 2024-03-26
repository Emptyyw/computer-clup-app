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
import i18next from 'i18next';

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
                  isAuthenticated ? 'md' : i18next.language === 'en' ? 'xs' : 'sm'
                }
                size="sm"
                aria-label="Toggle headerNavbar"
              />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <AppRouter />
        </AppShell.Main>
      </AppShell>
    </Router>
  );
};
