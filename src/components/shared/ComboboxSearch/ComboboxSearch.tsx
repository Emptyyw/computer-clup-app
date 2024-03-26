import { ChangeEvent, FC, ReactNode } from 'react';
import { CloseButton, Combobox, InputBase, rem, useCombobox } from '@mantine/core';
import classes from 'src/layout/header/HeaderInputSearch/HeaderInputSearch.module.css';
import { IconSearch } from '@tabler/icons-react';

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  placeholder: string;
  children: ReactNode;
};
export const ComboboxSearch: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  children,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
    setSearchQuery(e.currentTarget.value.trim());
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={val => {
        setSearchQuery(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          className={classes.input}
          value={searchQuery}
          pointer
          radius="md"
          size="md"
          placeholder={placeholder}
          onChange={onChangeHandler}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearchQuery(searchQuery || '');
          }}
          leftSection={
            <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setSearchQuery('')}
              style={{ display: searchQuery ? undefined : 'none' }}
            />
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={250} style={{ overflowY: 'auto' }}>
          {children}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
