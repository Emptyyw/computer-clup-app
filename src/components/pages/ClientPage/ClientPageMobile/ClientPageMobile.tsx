import { Accordion, Anchor, Avatar, Group, Text } from '@mantine/core';
import { IconAt, IconCoins, IconPhoneCall, IconUser } from '@tabler/icons-react';
import { User } from 'api/db';
import { useAppSelector } from 'hooks/redux-hooks';
import { FC, useEffect } from 'react';
import { getListUser } from 'redux/selectors/userSelectors';
import { getUsers } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { roleColors } from 'config/editUsersConfig';
import cx from './ClientPageMobile.module.css';
import { myColor } from 'main';
import { AccordionControl } from './AccordionControl';
import { ClientPageLogo } from '../ClientPageLogo/ClientPageLogo';

const ClientPageMobile: FC = () => {
  const dispatch = useAppDispatch();
  const usersList: User[] = useAppSelector(getListUser);

  useEffect(() => {
    async function fetchUsers() {
      await dispatch(getUsers());
    }
    fetchUsers();
  }, [dispatch]);

  return (
    <Accordion classNames={cx} maw={775}>
      {usersList.map(users => (
        <Accordion.Item value={users.id} key={users.id}>
          <AccordionControl {...users}>
            <div>
              <Group maw={300} wrap="nowrap">
                <Avatar src={users.avatarUrl} size={94} radius="lg">
                  <ClientPageLogo />
                </Avatar>
                <div>
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
                </div>
              </Group>
            </div>
          </AccordionControl>
          <Accordion.Panel>
            <Group>
              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={cx.icon} />
                <Anchor fz="xs">{users.email}</Anchor>
              </Group>
              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" className={cx.icon} />
                <Anchor c="dimmed" fz="xs">
                  {users.phoneNum}
                </Anchor>
              </Group>
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ClientPageMobile;
