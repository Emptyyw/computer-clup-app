import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { setRole, setUser } from 'redux/slice/userSlice';
import { useDispatch } from 'react-redux';

interface AuthenticationFormProps extends PaperProps {
  type: 'login' | 'register';
}
export function AuthenticationForm({
  type: formType,
  ...props
}: AuthenticationFormProps) {
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

  const dispatch = useDispatch();

  const handleRegister = event => {
    event.preventDefault();
    const auth = getAuth();
    const email = form.values.email;
    const password = form.values.password;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
        dispatch(setRole('user'));
        dispatch(
          setUser({
            login: form.values.login,
            email,
            token: userCredential.user.refreshToken,
            id: userCredential.user.uid,
          }),
        );
        navigate('/dashboard');
      })
      .catch(console.error);
  };
  const handleLogin = event => {
    event.preventDefault();
    const auth = getAuth();
    const email = form.values.email;
    const password = form.values.password;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
        dispatch(
          setUser({
            login: form.values.login,
            email,
            token: userCredential.user.refreshToken,
            id: userCredential.user.uid,
          }),
        );
        navigate('/dashboard');
      })
      .catch(console.error);
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

        <form onSubmit={type === 'login' ? handleLogin : handleRegister}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label={t('Name')}
                placeholder={t('Your name')}
                value={form.values.name}
                onChange={event => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}
            <TextInput
              required
              label={t('Login')}
              placeholder="Your login"
              value={form.values.login}
              onChange={event => form.setFieldValue('login', event.currentTarget.value)}
              error={form.errors.login && 'Invalid login'}
              radius="md"
            />

            <TextInput
              required
              label={t('Email')}
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={event => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label={t('Password')}
              placeholder={t('Your password')}
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
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
}
