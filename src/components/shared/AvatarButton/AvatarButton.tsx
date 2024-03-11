import { useState, useRef } from 'react';
import { FileButton, Button, Group } from '@mantine/core';
import { useAuth } from 'hooks/useAuth';
import { deleteUserAvatar, uploadAvatar } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { IconUpload, IconTrashX } from '@tabler/icons-react';

const AvatarButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const handleFileChange = async (selectedFile: File | null) => {
    if (selectedFile) {
      await dispatch(uploadAvatar(selectedFile));
    }
  };

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
    dispatch(deleteUserAvatar(auth.id));
  };

  return (
    <Group w="200" h="200" pt={30} justify="center">
      <FileButton
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/svg+xml"
      >
        {props => (
          <Button radius="xl" {...props}>
            <IconUpload />
          </Button>
        )}
      </FileButton>

      <Button disabled={!file} radius="xl" color="red" onClick={clearFile}>
        <IconTrashX />
      </Button>
    </Group>
  );
};

export default AvatarButton;
