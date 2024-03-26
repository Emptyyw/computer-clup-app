import { FC } from 'react';
import { Avatar, Box, Combobox, Group, Text } from '@mantine/core';
import { useAppSelector } from 'hooks/redux-hooks';
import { searchUserResultsSelector } from 'redux/selectors/searchSelector';
import { User } from 'api/db';
import { useTranslation } from 'react-i18next';

export const UsersItemsDropdown: FC = () => {
  const searchUserResults = useAppSelector(searchUserResultsSelector);

  const { t } = useTranslation();

  const onClickUserHandler = (user: User) => {
    console.log(user);
  };

  return (
    <>
      {searchUserResults.length ? (
        searchUserResults.map(user => (
          <Combobox.Option
            key={user.id}
            value={user.login}
            onClick={() => onClickUserHandler(user)}
          >
            <Group>
              <Avatar radius="xl" size="md" src={user.avatarUrl} />
              <Box>
                <Text>{user.login}</Text>
                <Text size="xs">{user.firstName}</Text>
              </Box>
            </Group>
          </Combobox.Option>
        ))
      ) : (
        <Combobox.Empty>
          <Text c={'red'}>{t('search.emptyText')}</Text>
        </Combobox.Empty>
      )}
    </>
  );
};
