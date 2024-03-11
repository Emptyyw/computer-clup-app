import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { TextInput, Button, ButtonProps } from '@mantine/core';
import { FC, useRef } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { authGoogle, updateLogin } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { useTranslation } from 'react-i18next';
import { RoutePaths } from 'Enum/Enum';
import { User } from 'api/db';

type Props = ButtonProps;

export const GoogleButton: FC<Props> = props => {
  const loginRef = useRef('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignInWithGoogle = async () => {
    const actionResult = await dispatch(authGoogle(loginRef.current));
    const user = actionResult.payload as User;
    if (!user.login) {
      modals.open({
        title: t('Enter your login'),
        children: (
          <>
            <TextInput
              placeholder={t('Your login')}
              data-autofocus
              onChange={event => (loginRef.current = event.currentTarget.value)}
            />
            <Button fullWidth onClick={() => handleSubmitLogin(user)} mt="md">
              {t('Submit')}
            </Button>
          </>
        ),
      });
    } else {
      navigate(RoutePaths.DASHBOARD_ROUTE);
    }
  };

  const handleSubmitLogin = async (user: User) => {
    const newLogin = loginRef.current;
    if (newLogin && user) {
      try {
        await dispatch(updateLogin({ user: user, newLogin: newLogin }));
        modals.closeAll();
        navigate(RoutePaths.DASHBOARD_ROUTE);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Login is required');
    }
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
