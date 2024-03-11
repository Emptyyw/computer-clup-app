import { Avatar, Paper } from '@mantine/core';
import { useAuth } from 'hooks/useAuth';
import AvatarButton from 'components/shared/AvatarButton/AvatarButton';
import classes from './UploadAvatar.module.css';

const AvatarUpload = () => {
  const auth = useAuth();

  return (
    <Paper className={classes.avatarContainer}>
      <Paper className={classes.avatarPaper} w="200" h="200">
        <Avatar src={auth.avatarUrl} w="200" h="200" radius="xl" />
      </Paper>
      <Paper className={classes.avatarButton}>
        <AvatarButton />
      </Paper>
    </Paper>
  );
};

export default AvatarUpload;
