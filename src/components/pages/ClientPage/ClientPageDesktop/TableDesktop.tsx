import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Anchor,
  rem,
  Flex,
  ActionIcon,
  Loader,
  Center,
} from '@mantine/core';
import { IconCoins, IconCornerDownRight } from '@tabler/icons-react';
import { User } from 'api/db';
import { useAppSelector } from 'hooks/redux-hooks';
import { useEffect } from 'react';
import { getListUser } from 'redux/selectors/userSelectors';
import { getUsers } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import ClientEditPage from '../ClientEditPage/ClientEditPage';
import { ClientPageLogo } from '../ClientPageLogo/ClientPageLogo';
import { roleColors } from 'config/editUsersConfig';
import { myColor } from 'main';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'Enum/Enum';
import { useMediaQuery } from '@mantine/hooks';
import LoaderRedux from 'components/shared/Loader/Loader';

const TableDesktop = () => {
  const dispatch = useAppDispatch();
  const usersList: User[] = useAppSelector(getListUser);

  const { t } = useTranslation();
  const isMatches = useMediaQuery('(max-width: 62em)');

  useEffect(() => {
    async function fetchUsers() {
      await dispatch(getUsers());
    }
    fetchUsers();
  }, [dispatch]);

  return (
    <>
      <LoaderRedux
        loader={
          <Center h="500">
            <Flex gap="md" justify="center" align="center" direction="row" wrap="nowrap">
              <Loader type="bars" />
            </Flex>
          </Center>
        }
      >
        <Table stickyHeader stickyHeaderOffset={70} highlightOnHover verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('clientpage.Full name')}</Table.Th>
              <Table.Th>{t('clientpage.Login')}</Table.Th>
              <Table.Th>{t('clientpage.Role')}</Table.Th>
              <Table.Th>{t('clientpage.Email')}</Table.Th>
              <Table.Th>{t('clientpage.Phone number')}</Table.Th>
              <Table.Th>{t('clientpage.Balance')}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {usersList.map(users => (
              <Table.Tr key={users.id}>
                <Table.Td>
                  <Group gap="sm">
                    {!isMatches && (
                      <Avatar src={users.avatarUrl} radius="md">
                        <ClientPageLogo />
                      </Avatar>
                    )}
                    <Text fz="sm" fw={500}>
                      {users.firstName} {users.lastName}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Text fz="sm" fw={500}>
                      {users.login}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge color={roleColors[users.role.toLowerCase()]} variant="light">
                    {users.role}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Anchor component="button" size="sm">
                      {users.email}
                    </Anchor>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Anchor
                      c="dimmed"
                      component="button"
                      size="sm"
                      data-phone-num={users.phoneNum}
                    >
                      {users.phoneNum}
                    </Anchor>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Flex justify="center" align="center" gap="md">
                    <Text fz="sm">0</Text>
                    <IconCoins color={myColor[2]} />
                  </Flex>
                </Table.Td>
                <Table.Td>
                  <Group wrap="wrap" gap="sm" justify="center">
                    <Anchor>
                      <ClientEditPage user={users} />
                    </Anchor>
                    <Anchor
                      aria-label="Profile"
                      component={Link}
                      to={`${RoutePaths.CLIENT_PROFILE_ROUTE}/${users.id}`}
                    >
                      <ActionIcon radius="xl" variant="subtle" aria-label="Edit">
                        <IconCornerDownRight
                          style={{ width: rem(20), height: rem(21) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Anchor>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </LoaderRedux>
    </>
  );
};

export default TableDesktop;
