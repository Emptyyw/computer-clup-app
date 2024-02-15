import ReactDOM from 'react-dom/client';
import App from 'App.tsx';
import './index.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const myColor: MantineColorsTuple = [
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
];

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'myColor',

  colors: {
    myColor,
  },
});

Promise.all([
  fetch('/locales/en.json').then(response => response.json()),
  fetch('/locales/ru.json').then(response => response.json()),
]).then(([enTranslation, ruTranslation]) => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalsProvider>
    </MantineProvider>,
  );
});
