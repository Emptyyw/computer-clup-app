import { FC } from 'react';
import { Group } from '@mantine/core';
import { HeaderLoginForm } from 'layout/header/HeaderLoginForm/HeaderLoginForm';
import LanguageSwitcher from 'components/shared/LanguageSwitcher/LanguageSwitcher';
import { ActionToggleTheme } from 'components/shared/ActionToggle/ActionToggleTheme';

export const UnauthenticatedContent: FC = () => {
  return (
    <Group>
      <HeaderLoginForm />
      <LanguageSwitcher />
      <ActionToggleTheme />
    </Group>
  );
};
