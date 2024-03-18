import { Avatar, Paper } from '@mantine/core';
import AvatarButton from 'components/shared/AvatarButton/AvatarButton';
import classes from './UploadAvatar.module.css';
import { getUser } from 'redux/selectors/userSelectors';
import { useAppSelector } from 'hooks/redux-hooks';

const AvatarUpload = () => {
  const auth = useAppSelector(getUser);

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
