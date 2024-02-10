import { upperFirst } from '@mantine/hooks';
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
import { registerUser, loginUser } from 'redux/slice/userSlice';
import { useAppDispatch } from 'store/store';
import { Paths } from 'Enum/Enum';
import { UserState } from 'redux/slice/userSlice';

interface Props {
  type: 'login' | 'register';
}

interface LoginValues {
  login: string;
  email: string;
  password: string;
  id?: string;
  token?: string;
}

const currentDashboard = Paths.Dashboard;

export const AuthenticationForm: FC<Props> = ({ type: formType, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [type, setType] = useState(formType);

  useEffect(() => {
    setType(formType);
  }, [formType]);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
      login: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const dispatch = useAppDispatch();
  const navigateToDashboard = () => {
    navigate(currentDashboard);
  };

  const onLogin = (values: LoginValues) => {
    const valuesWithToken: UserState = {
      ...values,
      token: values.token || 'defaultToken',
    };
    dispatch(loginUser(valuesWithToken)).then(() => navigateToDashboard());
  };

  const onRegister = (values: LoginValues) => {
    const valuesWithToken: UserState = {
      ...values,
      token: values.token || 'defaultToken',
    };
    dispatch(registerUser(valuesWithToken)).then(() => navigateToDashboard());
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
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container m="xl">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          {t('Hello')}! {t('Welcome')}!
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <GitHubButton radius="xl">GitHub</GitHubButton>
        </Group>

        <Divider label={t('Or continue with email')} labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmitSuccess)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label={t('Name')}
                placeholder={t('Your name')}
                value={form.values.name}
                {...form.getInputProps('name')}
                radius="md"
              />
            )}
            <TextInput
              required
              label={t('Login')}
              placeholder={t('Your login')}
              value={form.values.login}
              {...form.getInputProps('login')}
              error={form.errors.login && 'Invalid login'}
              radius="md"
            />

            {type === 'register' && (
              <TextInput
                required
                label={t('Email')}
                placeholder="hello@mantine.dev"
                value={form.values.email}
                {...form.getInputProps('email')}
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />
            )}

            <PasswordInput
              required
              label={t('Password')}
              placeholder={t('Your password')}
              value={form.values.password}
              {...form.getInputProps('password')}
              error={
                form.errors.password && t('Password should include at least 6 characters')
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label={t('I accept terms and conditions')}
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
                ? t('Already have an account? Login')
                : t("Don't have an account? Register")}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};
