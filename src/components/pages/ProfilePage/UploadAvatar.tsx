import { ActionIcon, Avatar, Paper } from '@mantine/core';
import { useAuth } from 'hooks/useAuth';
import {
  deleteUserAvatar,
  loadUserAvatar,
  saveUserAvatar,
  uploadAvatar,
} from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { useState, useRef, useEffect } from 'react';
import classes from 'components/pages/ProfilePage/UploadAvatar.module.css';
import { IconUpload, IconTrashX } from '@tabler/icons-react';

function AvatarUpload() {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (auth.id) {
      dispatch(loadUserAvatar(auth.id));
    }
  }, [dispatch, auth.id]);

  const handleUploadClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteUserAvatar(auth.id));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const actionResult = await dispatch(uploadAvatar(file));
      if (uploadAvatar.fulfilled.match(actionResult)) {
        const avatarUrl = actionResult.payload;
        dispatch(saveUserAvatar({ userId: auth.id, avatarUrl }));
      }
    }
  };

  return (
    <Paper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classes.avatarContainer}
    >
      <Avatar src={auth.avatarUrl} size={200} radius="xl" />
      {isHovered && (
        <div className={classes.hoverOverlay}>
          <ActionIcon
            m="lg"
            radius="lg"
            variant="subtle"
            size="lg"
            onClick={handleUploadClick}
          >
            <IconUpload />
          </ActionIcon>
          <ActionIcon
            m="lg"
            radius="lg"
            variant="subtle"
            size="lg"
            onClick={handleDeleteAvatar}
          >
            <IconTrashX />
          </ActionIcon>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={classes.hiddenInput}
      />
    </Paper>
  );
}

export default AvatarUpload;
