import './App.css';
import { Text, Container, Group } from '@mantine/core';
import { ActionToggle } from 'components/shared/ActionToggle/ActionToggle';
import '@mantine/core/styles.css';
import './components//18next/i18n';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Group justify="flex-end">
          <ActionToggle />
          <LanguageSwitcher />
        </Group>
        <Text>{t('Hello')}</Text>
      </Container>
    </>
  );
};

export default App;
