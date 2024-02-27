import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function InputSearch(props: TextInputProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  return (
    <TextInput
      radius="md"
      size="md"
      placeholder={t('search.searchPlaceholder')}
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <ActionIcon size={32} radius="md" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}
