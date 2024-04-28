import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { GoogleButton } from 'components/shared/AuthButton/GoogleButton';
import { GitHubButton } from 'components/shared/AuthButton/GitHubButton';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { RoutePaths } from 'Enum/Enum';

export type Props = {
  type: 'login' | 'register';
};

interface LoginValues {
  login: string;
  email: string;
  password: string;
  id?: string;
  token?: string;
  userId: string;
  name: string;
  terms: boolean;
}

const AuthenticationForm: FC<Props> = ({ type: formType, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [type, setType] = useState(formType);

  useEffect(() => {
    setType(formType);
  }, [formType]);

  const form = useForm({
    initialValues: {
      email: 'admin@gmail.com',
      name: '',
      password: 'kerimov2398',
      terms: true,
      login: '',
      userId: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : t('authForm.Invalid email')),
      password: val =>
        val.length <= 6
          ? t('authForm.Password should include at least 6 characters')
          : null,
    },
  });

  const dispatch = useAppDispatch();

  const onLogin = async (values: LoginValues) => {
    try {
      await dispatch(login(values));
      navigate(RoutePaths.PROFILE_ROUTE);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const onRegister = (values: LoginValues) => {
    dispatch(
      register({
        email: values.email,
        password: values.password,
        login: values.login,
        role: 'user',
        firstName: values.name,
        lastName: values.name,
        phoneNum: 1234567890,
      }),
    );
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  const onSubmitSuccess: (values: LoginValues) => void = values => {
    if (type === 'login') {
      onLogin(values);
    } else {
      onRegister(values);
    }
  };

  const handleToggleClick = () => {
    if (formType === 'login') {
      navigate(RoutePaths.REGISTRATION_ROUTE);
    } else {
      navigate(RoutePaths.LOGIN_ROUTE);
    }
  };

  return (
    <Container p="md">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          {t('authForm.Welcome')}!
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <GitHubButton radius="xl">GitHub</GitHubButton>
        </Group>

        <Divider
          label={t('authForm.Continue with Google')}
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(onSubmitSuccess)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label={t('authForm.Name')}
                placeholder={t('authForm.Your name')}
                value={form.values.name}
                {...form.getInputProps('name')}
                radius="md"
              />
            )}
            {type === 'register' && (
              <TextInput
                required
                label={t('authForm.Login')}
                placeholder={t('authForm.Your login')}
                value={form.values.login}
                {...form.getInputProps('login')}
                error={form.errors.login && t('authForm.Invalid login')}
                radius="md"
              />
            )}
            <TextInput
              required
              label={t('authForm.Email')}
              placeholder="hello@mantine.dev"
              value={form.values.email}
              {...form.getInputProps('email')}
              error={form.errors.email && t('authForm.Invalid email')}
              radius="md"
            />

            <PasswordInput
              required
              label={t('authForm.Password')}
              placeholder={t('authForm.Your password')}
              value={form.values.password}
              {...form.getInputProps('password')}
              error={
                form.errors.password &&
                t('authForm.Password should include at least 6 characters')
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label={t('authForm.I accept terms and conditions')}
                checked={form.values.terms}
                onChange={event =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>
          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={handleToggleClick}
              size="xs"
            >
              {formType === 'register'
                ? t('authForm.Already have an account? Login')
                : t('authForm.Dont have an account? Register')}
            </Anchor>
            <Button type="submit" radius="xl">
              {t(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};
export default AuthenticationForm;
