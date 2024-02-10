import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { TextInput, Button, ButtonProps } from '@mantine/core';
import { FC } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { signInWithGoogle } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { Paths } from 'Enum/Enum';
import { useTranslation } from 'react-i18next';

type Props = ButtonProps;
const currentDashboard = Paths.Dashboard;

export const GoogleButton: FC<Props> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignInWithGoogle = async () => {
    try {
      await dispatch(signInWithGoogle());

      modals.open({
        title: t('Enter your login'),
        children: (
          <>
            <TextInput
              placeholder={t('Your login')}
              data-autofocus
              onChange={event => event.currentTarget.value}
            />
            <Button fullWidth onClick={handleSubmitLogin} mt="md">
              {t('Submit')}
            </Button>
          </>
        ),
      });
    } catch (error) {
      error;
    }
  };

  const handleSubmitLogin = () => {
    modals.closeAll();
    navigate(currentDashboard);
  };

  return (
    <Button
      onClick={handleSignInWithGoogle}
      leftSection={<GoogleIcon />}
      variant="default"
      {...props}
    />
  );
};
