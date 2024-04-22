import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import {
  Paper,
  Group,
  ActionIcon,
  Text,
  Avatar,
  Badge,
  Box,
  Loader,
  Flex,
} from '@mantine/core';
import { IconAt, IconPhoneCall, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ModalForm } from '../ClientEditForm/ModalForm';
import { roleColors } from 'config/editUsersConfig';
import classes from 'components/pages/ClientPage/ClientEditPage/ClientEditPage.module.css';
import { modals } from '@mantine/modals';
import { mockdata } from 'config/profileConfig';
import { getUserById } from 'redux/slice/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useAuthUser } from 'hooks/useAuthUser';

const ClientProfile: FC = () => {
  const user = useSelector((state: RootState) => state.searchUser);
  const [active, setActive] = useState(0);

  const { t } = useTranslation();
  const { id } = useParams();

  const { isAdmin } = useAuthUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    navigate(mockdata[0].route);
  }, [navigate]);

  const mainItems = mockdata.map((item, index) => (
    <Link
      to={item.route}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={() => {
        setActive(index);
      }}
    >
      {t(item.label)}
    </Link>
  ));

  if (!user) {
    return (
      <Flex p={150} gap="xs" justify="center" align="center">
        <Loader size="xl" type="dots" />
      </Flex>
    );
  }

  const handleModal = () => {
    modals.open({
      title: t('editpage.Enter user data'),
      children: <ModalForm user={user} />,
    });
  };
  return (
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
            <Badge
              color={user ? roleColors[user.role.toLowerCase()] : 'default'}
              variant="light"
            >
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
        {isAdmin ? (
          <ActionIcon onClick={handleModal} radius="lg" variant="subtle" size="xl">
            <IconSettings />
          </ActionIcon>
        ) : null}
      </Paper>

      <Box className={classes.links} visibleFrom="sm">
        <Group gap={0} justify="flex-start">
          {mainItems}
        </Group>
      </Box>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default ClientProfile;
