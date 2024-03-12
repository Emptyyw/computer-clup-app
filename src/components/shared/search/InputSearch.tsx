import { rem, TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classes from './InputSearch.module.css';

export function InputSearch(props: TextInputProps) {
  const { t } = useTranslation();

  return (
    <TextInput
      className={classes.input}
      radius="md"
      size="md"
      placeholder={t('search.searchPlaceholder')}
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      {...props}
    />
  );
}
