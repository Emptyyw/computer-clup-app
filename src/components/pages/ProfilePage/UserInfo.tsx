import { Text, Group, TextInput, Button, ActionIcon, Paper } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from 'components/pages/ProfilePage/UserInfo.module.css';
import { useAuth } from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { updateProfile } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { IconSettings } from '@tabler/icons-react';
import AvatarUpload from './UploadAvatar';

function UserInfo() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleModal = () => {
    let firstName = auth.firstName || '';
    let lastName = auth.lastName || '';

    const handleProfileUpdate = async () => {
      dispatch(updateProfile({ user: auth, firstName, lastName }));
      modals.closeAll();
    };

    modals.open({
      title: t('userinfo.Enter your data'),
      children: (
        <>
          <TextInput
            p="md"
            placeholder={t('userinfo.Your Name')}
            data-autofocus
            onChange={event => (firstName = event.currentTarget.value)}
          />
          <TextInput
            p="md"
            placeholder={t('userinfo.Your Last Name')}
            data-autofocus
            onChange={event => (lastName = event.currentTarget.value)}
          />

          <Button fullWidth onClick={handleProfileUpdate} mt="md">
            {t('userinfo.Submit')}
          </Button>
        </>
      ),
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
