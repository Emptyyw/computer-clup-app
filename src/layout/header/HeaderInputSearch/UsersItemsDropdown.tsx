import { FC } from 'react';
import { Anchor, Avatar, Box, Combobox, Group, Text } from '@mantine/core';
import { useAppSelector } from 'hooks/redux-hooks';
import { searchUserResultsSelector } from 'redux/selectors/searchSelector';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'Enum/Enum';

export const UsersItemsDropdown: FC = () => {
  const searchUserResults = useAppSelector(searchUserResultsSelector);

  const { t } = useTranslation();

  return (
    <>
      {searchUserResults.length ? (
        searchUserResults.map(user => (
          <Combobox.Option key={user.id} value={user.login}>
            <Anchor
              underline="never"
              component={Link}
              to={`${RoutePaths.CLIENT_PROFILE_ROUTE}/${user.id}`}
            >
              <Group>
                <Avatar radius="xl" size="md" src={user.avatarUrl} />
                <Box>
                  <Text>{user.login}</Text>
                  <Text size="xs">{user.firstName}</Text>
                </Box>
              </Group>
            </Anchor>
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
