import ReactDOM from 'react-dom/client';
import './index.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';

export const myColor: MantineColorsTuple = [
  '#00AD9C',
  '#00AD9C',
  '#e6a607',
  '#a7a4a2',
  '#00AD9C',
  '#00AD9C',
  '#00AD9C',
  '#00AD9C',
  '#00AD9C',
  '#00AD9C',
];

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'myColor',
  breakpoints: {
    xs: '550px',
    sm: '630px',
    md: '901px',
    lg: '74em',
    xl: '90em',
  },

  colors: {
    myColor,
  },
});

Promise.all([
  fetch('/locales/en.json').then(response => response.json()),
  fetch('/locales/ru.json').then(response => response.json()),
]).then(([enTranslation, ruTranslation]) => {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
        ru: {
          translation: ruTranslation,
        },
      },
      lng: localStorage.getItem('language') || 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </Provider>,
  );
});
