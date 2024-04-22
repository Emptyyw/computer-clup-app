import { Text, Group, ActionIcon, Paper } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from 'components/pages/ProfilePage/UserInfo.module.css';
import { useTranslation } from 'react-i18next';
import { IconSettings } from '@tabler/icons-react';
import AvatarUpload from './UploadAvatar';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';
import { EditModalForm } from './ProfileEditForm/EditModalForm';

function UserInfo() {
  const auth = useAppSelector(getUser);
  const { t } = useTranslation();

  const handleModal = () => {
    modals.open({
      title: t('userinfo.Enter your data'),
      children: <EditModalForm />,
    });
  };

  return (
    <>
      <Paper className={classes.wrapper}>
        <Paper className={classes.paper}>
          <AvatarUpload />
        </Paper>

        <Group p="md" wrap="nowrap">
          <Paper className={classes.item}>
            <Text fz="lg" tt="uppercase" fw={700} c="dimmed">
              {auth.firstName} {auth.lastName}
            </Text>

            <Text fz="lg" fw={500} className={classes.name}>
              {auth.login}
            </Text>

            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              <Text fz="md" c="dimmed">
                {auth.email}
              </Text>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
              <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
              <Text fz="md" c="dimmed">
                {auth.phoneNum}
              </Text>
            </Group>
          </Paper>
        </Group>
        <ActionIcon onClick={handleModal} radius="lg" variant="subtle" size="xl">
          <IconSettings />
        </ActionIcon>
      </Paper>
    </>
  );
}
export default UserInfo;
