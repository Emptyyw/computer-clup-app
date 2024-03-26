import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useDebouncedValue } from '@mantine/hooks';
import { searchUsersAsync } from 'redux/slice/userSlice';
import { ComboboxSearch } from 'components/shared/ComboboxSearch/ComboboxSearch';
import { UsersItemsDropdown } from 'src/layout/header/HeaderInputSearch/UsersItemsDropdown';

export const HeaderInputSearch: FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');

  const [debounced] = useDebouncedValue(searchQuery, 300);

  useEffect(() => {
    if (debounced) {
      dispatch(searchUsersAsync(debounced));
    }
  }, [debounced]);

  return (
    <ComboboxSearch
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={t('search.searchPlaceholder')}
    >
      <UsersItemsDropdown />
    </ComboboxSearch>
  );
};
