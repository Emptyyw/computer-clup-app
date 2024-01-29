import './App.css';
import { Text } from '@mantine/core';
import { ActionToggle } from './components/shared/ActionToggle/ActionToggle';
import '@mantine/core/styles.css';
import './components//18next/i18n';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../src/components/18next/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <ActionToggle />
      <Text>{t('Hello')}</Text>
      <LanguageSwitcher />
    </div>
  );
}

export default App;
