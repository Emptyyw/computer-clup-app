import { useDisclosure } from '@mantine/hooks';
import {
  Drawer,
  rem,
  Paper,
  Group,
  ActionIcon,
  Text,
  Avatar,
  Badge,
} from '@mantine/core';
import { IconAt, IconPencil, IconPhoneCall, IconSettings } from '@tabler/icons-react';
import { FC } from 'react';
import classes from 'components/pages/ClientPage/ClientEditPage/ClientEditPage.module.css';
import { roleColors } from 'config/editUsersConfig';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import { User } from 'api/db';
import { ModalForm } from '../ClientEditForm/ModalForm';

type Props = {
  user: User;
};

const ClientEditPage: FC<Props> = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const handleModal = () => {
    modals.open({
      title: t('editpage.Enter user data'),
      children: <ModalForm user={user} />,
    });
  };
  return (
    <>
      <Drawer
        size="lg"
        radius="sm"
        opened={opened}
        onClose={close}
        position="right"
        title={t('editpage.User ID') + ': ' + user.id}
      >
        <>
          <Paper className={classes.wrapper}>
            <Paper className={classes.paper}>
              <Avatar src={user.avatarUrl} w="200" h="200" radius="xl" />
            </Paper>

            <Group p="md" wrap="nowrap">
              <Paper className={classes.item}>
                <Text fz="lg" tt="uppercase" fw={700} c="dimmed">
                  {user.firstName} {user.lastName}
                </Text>

                <Text fz="lg" fw={500} className={classes.name}>
                  {user.login}
                </Text>
                <Badge color={roleColors[user.role.toLowerCase()]} variant="light">
                  {user.role}
                </Badge>

                <Group wrap="nowrap" gap={10} mt={3}>
                  <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                  <Text fz="md" c="dimmed">
                    {user.email}
                  </Text>
                </Group>

                <Group wrap="nowrap" gap={10} mt={5}>
                  <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
                  <Text fz="md" c="dimmed">
                    {user.phoneNum}
                  </Text>
                </Group>
              </Paper>
            </Group>
            <ActionIcon onClick={handleModal} radius="lg" variant="subtle" size="xl">
              <IconSettings />
            </ActionIcon>
          </Paper>
        </>
      </Drawer>
      <ActionIcon
        size="lg"
        radius="xl"
        variant="light"
        color="#008a7c"
        aria-label="Edit"
        onClick={open}
      >
        <IconPencil style={{ width: rem(21), height: rem(21) }} stroke={2} />
      </ActionIcon>
    </>
  );
};
export default ClientEditPage;
