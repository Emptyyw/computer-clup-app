import {
  Accordion,
  ActionIcon,
  Anchor,
  Avatar,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Text,
  rem,
} from '@mantine/core';
import {
  IconAt,
  IconCoins,
  IconCornerDownRight,
  IconPhoneCall,
  IconUser,
} from '@tabler/icons-react';
import { User } from 'api/db';
import LoaderRedux from 'components/shared/Loader/Loader';
import { roleColors } from 'config/editUsersConfig';
import { useAppSelector } from 'hooks/redux-hooks';
import { myColor } from 'main';
import { getListUser } from 'redux/selectors/userSelectors';
import ClientEditPage from '../ClientEditPage/ClientEditPage';
import { ClientPageLogo } from '../ClientPageLogo/ClientPageLogo';
import cx from './ClientPageMobile.module.css';
import { RoutePaths } from 'Enum/Enum';
import { Link } from 'react-router-dom';

const AccordionMobile = () => {
  const usersList: User[] = useAppSelector(getListUser);

  return (
    <LoaderRedux
      loader={
        <Center h="500">
          <Flex gap="md" justify="center" align="center" direction="row" wrap="nowrap">
            <Loader type="bars" />
          </Flex>
        </Center>
      }
    >
      <Accordion classNames={cx} maw={775}>
        {usersList.map(users => (
          <Accordion.Item value={users.id} key={users.id}>
            <Group wrap="nowrap" justify="end" m="md">
              <Accordion.Control>
                <Group>
                  <Group maw={300} wrap="nowrap">
                    <Avatar src={users.avatarUrl} size={94} radius="lg">
                      <ClientPageLogo />
                    </Avatar>
                    <Container>
                      <Text
                        c={roleColors[users.role.toLowerCase()]}
                        fz="xs"
                        tt="uppercase"
                        fw={700}
                      >
                        {users.role}
                      </Text>
                      <Text fz="lg" fw={500} className={cx.name}>
                        {users.firstName} {users.lastName}
                      </Text>
                      <Group wrap="nowrap" gap={10} mt={5}>
                        <IconUser stroke={1.5} size="1rem" className={cx.icon} />
                        <Text fz="xs" c="dimmed">
                          {users.login}
                        </Text>
                      </Group>
                      <Group wrap="nowrap" gap={10} mt={5}>
                        <IconCoins color={myColor[2]} stroke={1.5} size="1rem" />
                        <Text fz="xs" c="dimmed">
                          23013$
                        </Text>
                      </Group>
                    </Container>
                  </Group>
                </Group>
              </Accordion.Control>
              <Group wrap="wrap" justify="end">
                <Anchor size="xl">
                  <ClientEditPage user={users} />
                </Anchor>
                <Anchor
                  size="xl"
                  aria-label="Profile"
                  component={Link}
                  to={`${RoutePaths.CLIENT_PROFILE_ROUTE}/${users.id}`}
                >
                  <ActionIcon
                    color="#008a7c"
                    radius="xl"
                    variant="light"
                    size="lg"
                    aria-label="Edit"
                  >
                    <IconCornerDownRight
                      style={{ width: rem(22), height: rem(22) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Anchor>
              </Group>
            </Group>
            <Accordion.Panel>
              <Group>
                <Group wrap="nowrap" gap={10} mt={3}>
                  <IconAt stroke={1.5} size="1rem" className={cx.icon} />
                  <Anchor fz="xs">{users.email}</Anchor>
                </Group>
                <Group wrap="nowrap" gap={10} mt={5}>
                  <IconPhoneCall stroke={1.5} size="1rem" className={cx.icon} />
                  <Anchor c="dimmed" fz="xs" href={`tel:${users.phoneNum}`}>
                    {users.phoneNum}
                  </Anchor>
                </Group>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </LoaderRedux>
  );
};

export default AccordionMobile;
