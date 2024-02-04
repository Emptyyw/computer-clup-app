import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Hello: 'Hello',
      Welcome: 'Welcome',
      'Or continue with email': 'Or continue with email',
      Name: 'Name',
      Email: 'Email',
      Password: 'Password',
      'Create Account': 'Create Account',
      'Already have an account? Login': 'Already have an account? Login',
      'Sign In': 'Sign In',
      'Forgot Password?': 'Forgot Password?',
      'Continue with Google': 'Continue with Google',
      'Your name': 'Your name',
      'I accept terms and conditions': 'I accept terms and conditions',
      "Don't have an account? Register": "Don't have an account? Register",
      'Your password': 'Your password',
      'Your email': 'Your email',
      'Your password again': 'Repeat password',
    },
  },
  ru: {
    translation: {
      Hello: 'Привет',
      Welcome: 'Добро пожаловать',
      'Or continue with email': 'Или продолжить по электронной почте',
      Name: 'Имя',
      Email: 'Электронная почта',
      Password: 'Пароль',
      'Create Account': 'Создать аккаунт',
      'Already have an account? Login': 'Уже есть аккаунт? Войти',
      'Sign In': 'Войти',
      'Forgot Password?': 'Забыли пароль?',
      'Continue with Google': 'Продолжить с Google',
      'Your name': 'Ваше имя',
      'I accept terms and conditions': 'Я принимаю условия и положения',
      "Don't have an account? Register": 'Нет аккаунта? Зарегистрироваться',
      'Your password': 'Ваш пароль',
      'Your email': 'Ваша электронная почта',
      'Your password again': 'Повторите пароль',
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export type MyTranslationKeys = keyof (typeof resources)['ru']['translation'];
