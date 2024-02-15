import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Group, Text } from '@mantine/core';
import cx from 'clsx';
import classes from './LanguageSwitcher.module.css';
import { langSwitcher } from 'Enum/Enum';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = () => {
    const newLanguage =
      currentLanguage === langSwitcher.LangEn ? langSwitcher.LangRu : langSwitcher.LangEn;
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <Group>
      <ActionIcon
        onClick={changeLanguage}
        variant="default"
        size="xl"
        aria-label="Switch language"
        radius="lg"
      >
        <Text className={cx(classes.icon)}>{currentLanguage.toUpperCase()}</Text>
      </ActionIcon>
    </Group>
  );
}

export default LanguageSwitcher;
